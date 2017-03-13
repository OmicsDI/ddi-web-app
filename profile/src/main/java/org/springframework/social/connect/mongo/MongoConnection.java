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

import org.bson.types.ObjectId;
import org.hibernate.validator.constraints.NotEmpty;
import org.hibernate.validator.constraints.Range;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * The Mongodb collection for the spring social connections.
 * 
 * @author Carlo P. Micieli
 */
@Document(collection = "connections")
@CompoundIndexes({
	@CompoundIndex(name = "connections_rank_idx", def = "{'userId': 1, 'providerId': 1, 'rank': 1}", unique = true),
	@CompoundIndex(name = "connections_primary_idx", def = "{'userId': 1, 'providerId': 1, 'providerUserId': 1}", unique = true)
})
public class MongoConnection {
	@Id
	private ObjectId id;
	
	@NotEmpty
	String userId;
	
	@NotEmpty
	String providerId;

	String providerUserId;
	
	@Range(min = 1, max = 9999)
	int rank; //not null
	String displayName;
	String profileUrl;
	String imageUrl;
	
	@NotEmpty
	String accessToken;
	
	String secret;
	String refreshToken;
	Long expireTime;
	
	public ObjectId getId() {
		return id;
	}
	
	public String getUserId() {
		return userId;
	}
	
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	public String getProviderId() {
		return providerId;
	}
	
	public void setProviderId(String providerId) {
		this.providerId = providerId;
	}
	public String getProviderUserId() {
		return providerUserId;
	}
	
	public void setProviderUserId(String providerUserId) {
		this.providerUserId = providerUserId;
	}
	
	public int getRank() {
		return rank;
	}
	
	public void setRank(int rank) {
		this.rank = rank;
	}
	
	public String getDisplayName() {
		return displayName;
	}
	
	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}
	
	public String getProfileUrl() {
		return profileUrl;
	}
	
	public void setProfileUrl(String profileUrl) {
		this.profileUrl = profileUrl;
	}
	
	public String getImageUrl() {
		return imageUrl;
	}
	
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	
	public String getAccessToken() {
		return accessToken;
	}
	
	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}
	
	public String getSecret() {
		return secret;
	}
	
	public void setSecret(String secret) {
		this.secret = secret;
	}
	
	public String getRefreshToken() {
		return refreshToken;
	}
	
	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}
	
	public Long getExpireTime() {
		return expireTime;
	}
	
	public void setExpireTime(Long expireTime) {
		this.expireTime = expireTime;
	}
}