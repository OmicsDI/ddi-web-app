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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionData;
import org.springframework.social.connect.ConnectionFactory;
import org.springframework.social.connect.ConnectionFactoryLocator;
import org.springframework.social.connect.mongo.MongoConnection;
import org.springframework.stereotype.Component;

/**
 * A converter class between Mongo document and
 * Spring social connection.
 * 
 * @author Carlo Micieli
 */
@Component
public class ConnectionConverter {
	private final ConnectionFactoryLocator connectionFactoryLocator;
	private final TextEncryptor textEncryptor;

	@Autowired
	public ConnectionConverter(ConnectionFactoryLocator connectionFactoryLocator,
		TextEncryptor textEncryptor) {
	
		this.connectionFactoryLocator = connectionFactoryLocator;
		this.textEncryptor = textEncryptor;
	}
	
	public Connection<?> convert(MongoConnection cnn) {
		if (cnn==null) return null;
		
		ConnectionData connectionData = fillConnectionData(cnn);
		ConnectionFactory<?> connectionFactory = connectionFactoryLocator.getConnectionFactory(connectionData.getProviderId());
		return connectionFactory.createConnection(connectionData);
	}
	
	private ConnectionData fillConnectionData(MongoConnection uc) {
		return new ConnectionData(uc.getProviderId(),
			uc.getProviderUserId(),
			uc.getDisplayName(),
			uc.getProfileUrl(),
			uc.getImageUrl(),
			decrypt(uc.getAccessToken()),
			decrypt(uc.getSecret()),
			decrypt(uc.getRefreshToken()),
			uc.getExpireTime());
	}
	
	public MongoConnection convert(Connection<?> cnn) {
		ConnectionData data = cnn.createData();
		
		MongoConnection userConn = new MongoConnection();
		userConn.setProviderId(data.getProviderId());
		userConn.setProviderUserId(data.getProviderUserId());
		userConn.setDisplayName(data.getDisplayName());
		userConn.setProfileUrl(data.getProfileUrl());
		userConn.setImageUrl(data.getImageUrl());
		userConn.setAccessToken(encrypt(data.getAccessToken()));
		userConn.setSecret(encrypt(data.getSecret()));
		userConn.setRefreshToken(encrypt(data.getRefreshToken()));
		userConn.setExpireTime(data.getExpireTime());
		return userConn;
	}
	
	// helper methods
	
	private String decrypt(String encryptedText) {
		return encryptedText != null ? textEncryptor.decrypt(encryptedText) : encryptedText;
	}

	private String encrypt(String text) {
		return text != null ? textEncryptor.encrypt(text) : text;
	}
}
