package uk.ac.ebi.ddi.security.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.social.security.SocialUserDetails;

import java.util.HashSet;
import java.util.Set;

public class User implements SocialUserDetails {

	private Long id;

	@JsonIgnore
	private String providerId;

	@JsonIgnore
	private String providerUserId;

	@JsonIgnore
	private String accessToken;

	private String username;

	private long expires;

	private boolean accountExpired;

	private boolean accountLocked;

	private boolean credentialsExpired;

	private boolean accountEnabled;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Override
	@JsonIgnore
	public String getUserId() {
		return id.toString();
	}

	@Override
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	@JsonIgnore
	public Set<GrantedAuthority> getAuthorities() {
		final GrantedAuthority a = new GrantedAuthority(){
			@Override
			public String getAuthority() {
				return "USER";
			}
		};
		return new HashSet<GrantedAuthority>(){{ add(a); }};
	}

	@Override
	@JsonIgnore
	public boolean isAccountNonExpired() {
		return !accountExpired;
	}

	@Override
	@JsonIgnore
	public boolean isAccountNonLocked() {
		return !accountLocked;
	}

	@Override
	@JsonIgnore
	public boolean isCredentialsNonExpired() {
		return !credentialsExpired;
	}

	@Override
	@JsonIgnore
	public boolean isEnabled() {
		return !accountEnabled;
	}

	public long getExpires() {
		return expires;
	}

	public void setExpires(long expires) {
		this.expires = expires;
	}

	@Override
	public String toString() {
		return getClass().getSimpleName() + ": " + getUsername();
	}

	@Override
	@JsonIgnore
	public String getPassword() {
		throw new IllegalStateException("password should never be used");
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

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}
}
