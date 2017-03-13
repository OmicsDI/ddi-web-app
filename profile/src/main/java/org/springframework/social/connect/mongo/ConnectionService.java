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

import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionKey;
import org.springframework.util.MultiValueMap;

import java.util.List;
import java.util.Set;

public interface ConnectionService {

	int getMaxRank(String userId, String providerId);

	void create(String userId, Connection<?> userConn, int rank);

	void update(String userId, Connection<?> userConn);

	void remove(String userId, ConnectionKey connectionKey);

	void remove(String userId, String providerId);

	Connection<?> getPrimaryConnection(String userId,
                                       String providerId);

	Connection<?> getConnection(String userId,
                                String providerId, String providerUserId);

	List<Connection<?>> getConnections(String userId);

	List<Connection<?>> getConnections(String userId,
                                       String providerId);

	List<Connection<?>> getConnections(String userId,
                                       MultiValueMap<String, String> providerUsers);

	Set<String> getUserIds(String providerId,
                           Set<String> providerUserIds);

	List<String> getUserIds(String providerId,
                            String providerUserId);

}