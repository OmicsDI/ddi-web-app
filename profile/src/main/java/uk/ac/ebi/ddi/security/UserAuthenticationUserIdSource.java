package uk.ac.ebi.ddi.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.social.UserIdSource;
import uk.ac.ebi.ddi.security.model.MongoUser;
import uk.ac.ebi.ddi.security.model.UserAuthentication;

public class UserAuthenticationUserIdSource implements UserIdSource {

	@Override
	public String getUserId() {
		final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		MongoUser user = null;
		if (authentication instanceof UserAuthentication) {
			user = (MongoUser) authentication.getPrincipal();
		}

		if (user == null) {
			throw new IllegalStateException("Unable to get a ConnectionRepository: no user signed in");
		}
		return user.getUserId();
	}
}
