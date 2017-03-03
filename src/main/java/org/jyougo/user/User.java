package org.jyougo.user;

import org.springframework.security.core.GrantedAuthority;

import java.util.Set;

public class User {

	private String username;
	
	private Set<GrantedAuthority> grantedAuthorities;

	public User (String username, Set<GrantedAuthority> grantedAuthorities) {
		this.username = username;
		this.grantedAuthorities = grantedAuthorities;
	}
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Set<GrantedAuthority> getGrantedAuthorities() {
		return grantedAuthorities;
	}

	public void setGrantedAuthorities(Set<GrantedAuthority> grantedAuthorities) {
		this.grantedAuthorities = grantedAuthorities;
	}
	
	
	
}
