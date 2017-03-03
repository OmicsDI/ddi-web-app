package org.jyougo.springsocial;

import org.jyougo.user.User;
import org.jyougo.user.UserDao;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.web.SignInAdapter;
import org.springframework.web.context.request.NativeWebRequest;

public class SocialSignInAdapter implements SignInAdapter {
	
	UserDao userDao;
	
	public SocialSignInAdapter(UserDao userDao) {
		this.userDao = userDao;
	}

	public String signIn(String localUserId, Connection<?> connection, NativeWebRequest request) {
    	
		User user = userDao.findUserById(localUserId);
  	
		SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(user.getUsername(), null, user.getGrantedAuthorities()));
       
		for (ServiceProvider serviceProvider: ServiceProvider.values()) {
		    if (connection.getKey() != null 
		            && serviceProvider.getId().equalsIgnoreCase(connection.getKey().getProviderId())) {
		        return serviceProvider.getRedirectUrl();
		    }
		}
		
		return null;
    }
}