package uk.ac.ebi.ddi.security.model;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import uk.ac.ebi.ddi.security.model.MongoUser;

import java.util.Collection;

public class UserAuthentication implements Authentication {

	private final MongoUser user;
	private boolean authenticated = true;

	public UserAuthentication(MongoUser user) {
		this.user = user;
	}

	@Override
	public String getName() {
		return user.getUsername();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return user.getAuthorities();
	}

	@Override
	public Object getCredentials() {
		return null;
	}

	@Override
	public MongoUser getDetails() {
		return user;
	}

	@Override
	public Object getPrincipal() {
		return user;
	}

	@Override
	public boolean isAuthenticated() {
		return authenticated;
	}

	@Override
	public void setAuthenticated(boolean authenticated) {
		this.authenticated = authenticated;
	}
}
