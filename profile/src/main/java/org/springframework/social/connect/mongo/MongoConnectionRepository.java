/*
 * Copyright 2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.springframework.social.connect.mongo;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.social.connect.*;
import org.springframework.social.connect.mongo.ConnectionService;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.*;

class MongoConnectionRepository implements ConnectionRepository {

	private final String userId;

	private final ConnectionService connService;

	private final ConnectionFactoryLocator connectionFactoryLocator;

	//private final TextEncryptor textEncryptor;

	public MongoConnectionRepository(String userId, 
		ConnectionService connectionService,
		ConnectionFactoryLocator connectionFactoryLocator,
		TextEncryptor textEncryptor) {
		
		this.userId = userId;
		this.connService = connectionService;
		this.connectionFactoryLocator = connectionFactoryLocator;
		//this.textEncryptor = textEncryptor;
		//this.connectionMapper = new ConnectionMapper(connectionFactoryLocator, textEncryptor);
	}

//	private String encrypt(String text) {
//		return text != null ? textEncryptor.encrypt(text) : text;
//	}

	/**
	 * Add a new connection to this repository for the current user.
	 */
	@Override
	public void addConnection(Connection<?> connection) {
		try {
			ConnectionData data = connection.createData();
			
			int rank = connService.getMaxRank(userId, data.getProviderId());
			connService.create(userId, connection, rank);
			
		} catch (DuplicateKeyException e) {
			throw new DuplicateConnectionException(connection.getKey());
		}
	}
	
	/**
	 * Find all connections the current user has across all providers
	 */
	@Override
	public MultiValueMap<String, Connection<?>> findAllConnections() {
		List<Connection<?>> resultList = connService.getConnections(this.userId);
		
		MultiValueMap<String, Connection<?>> connections = new LinkedMultiValueMap<String, Connection<?>>();
		Set<String> registeredProviderIds = this.connectionFactoryLocator.registeredProviderIds();
		for (String registeredProviderId : registeredProviderIds) {
			connections.put(registeredProviderId, Collections.<Connection<?>>emptyList());
		}
		
		for (Connection<?> connection : resultList) {
			String providerId = connection.getKey().getProviderId();
			if (connections.get(providerId).size() == 0) {
				connections.put(providerId, new LinkedList<Connection<?>>());
			}
			connections.add(providerId, connection);
		}
		return connections;
	}

	/**
	 * Find the connections the current user has to the provider of the given API
	 */
	@SuppressWarnings("unchecked")
	@Override
	public <A> List<Connection<A>> findConnections(Class<A> apiType) {
		List<?> connections = findConnections(getProviderId(apiType));
		return (List<Connection<A>>) connections;
	}

	/**
	 * Find the connections the current user has to the provider registered by the given id
	 */
	@Override
	public List<Connection<?>> findConnections(String providerId) {
		return connService.getConnections(this.userId, providerId);
	}

	/**
	 * Find the connections the current user has to the given provider users. 
	 */
	@Override
	public MultiValueMap<String, Connection<?>> findConnectionsToUsers(MultiValueMap<String, String> providerUsers) {
		if (providerUsers == null || providerUsers.isEmpty()) {
			throw new IllegalArgumentException("Unable to execute find: no providerUsers provided");
		}
		
		List<Connection<?>> resultList = connService.getConnections(userId, providerUsers);
		
		MultiValueMap<String, Connection<?>> connectionsForUsers = new LinkedMultiValueMap<String, Connection<?>>();
		for (Connection<?> connection : resultList) {
			String providerId = connection.getKey().getProviderId();
			List<String> userIds = providerUsers.get(providerId);
			List<Connection<?>> connections = connectionsForUsers.get(providerId);
			if (connections == null) {
				connections = new ArrayList<Connection<?>>(userIds.size());
				for (int i = 0; i < userIds.size(); i++) {
					connections.add(null);
				}
				connectionsForUsers.put(providerId, connections);
			}
			String providerUserId = connection.getKey().getProviderUserId();
			int connectionIndex = userIds.indexOf(providerUserId);
			connections.set(connectionIndex, connection);
		}
		return connectionsForUsers;
	}

	/**
	 * Get a connection for the current user by its key
	 */
	@Override
	public Connection<?> getConnection(ConnectionKey connectionKey) {
		try {
			return connService.getConnection(userId, 
				connectionKey.getProviderId(), 
				connectionKey.getProviderUserId());
		} catch (EmptyResultDataAccessException e) {
			throw new NoSuchConnectionException(connectionKey);
		}
	}

	/**
	 * Get a connection between the current user and the given provider user.
	 */
	@Override
	@SuppressWarnings("unchecked")
	public <A> Connection<A> getConnection(Class<A> apiType, String providerUserId) {
		String providerId = getProviderId(apiType);
		return (Connection<A>) getConnection(new ConnectionKey(providerId, providerUserId));
	}

	/**
	 * Get the "primary" connection the current user has to the provider of the given API.
	 */
	@Override
	@SuppressWarnings("unchecked")
	public <A> Connection<A> getPrimaryConnection(Class<A> apiType) {
		String providerId = getProviderId(apiType);
		Connection<A> connection = (Connection<A>) findPrimaryConnection(providerId);
		if (connection == null) {
			throw new NotConnectedException(providerId);
		}
		return connection;
	}
	
	/**
	 * Find the "primary" connection the current user has to the provider of the given API
	 */
	@Override
	@SuppressWarnings("unchecked")
	public <A> Connection<A> findPrimaryConnection(Class<A> apiType) {
		String providerId = getProviderId(apiType);
		return (Connection<A>) findPrimaryConnection(providerId);
	}
	
	/**
	 * Update a Connection already added to this repository.
	 */
	@Override
	public void updateConnection(Connection<?> connection) {
		connService.update(userId, connection);
	}

	/**
	 * Remove all Connections between the current user and the provider from this repository.
	 */
	@Override
	public void removeConnections(String providerId) {
		connService.remove(userId, providerId);
	}

	/**
	 * Remove a single Connection for the current user from this repository.
	 */
	@Override
	public void removeConnection(ConnectionKey connectionKey) {
		connService.remove(userId, connectionKey);
	}

	// helper methods
	
	private <A> String getProviderId(Class<A> apiType) {
		return connectionFactoryLocator.getConnectionFactory(apiType).getProviderId();
	}

	private Connection<?> findPrimaryConnection(String providerId) {
		// where userId = ? and providerId = ? and rank = 1
		return connService.getPrimaryConnection(userId, providerId);
	}
}