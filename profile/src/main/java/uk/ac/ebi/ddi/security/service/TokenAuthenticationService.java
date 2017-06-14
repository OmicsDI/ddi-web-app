package uk.ac.ebi.ddi.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.util.WebUtils;
import uk.ac.ebi.ddi.security.TokenHandler;
import uk.ac.ebi.ddi.security.model.UserAuthentication;
import uk.ac.ebi.ddi.security.model.MongoUser;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;

@Service
public class TokenAuthenticationService {

	private static final String AUTH_HEADER_NAME = "X-AUTH-TOKEN";
	private static final String AUTH_COOKIE_NAME = "AUTH-TOKEN";
	private static final long TEN_DAYS = 1000 * 60 * 60 * 24 * 10;

	private final TokenHandler tokenHandler;

	@Autowired
	public TokenAuthenticationService(@Value("${token.secret}") String secret) {
		tokenHandler = new TokenHandler(DatatypeConverter.parseBase64Binary(secret));
	}

	@Autowired
	Environment env;

	public void addAuthentication(HttpServletResponse response, UserAuthentication authentication) {
		final MongoUser user = authentication.getDetails();
		user.setExpires(System.currentTimeMillis() + TEN_DAYS);
		final String token = tokenHandler.createTokenForUser(user);

		// Put the token into a cookie because the client can't capture response
		// headers of redirects / full page reloads.
		// (Its reloaded as a result of this response triggering a redirect back to "/")
		//response.addCookie(createCookieForToken(token));

		final String targetUrl = env.getRequiredProperty("security.targetUrl");

		try {
			response.sendRedirect(targetUrl + "?AUTH_TOKEN=" + token);
		}catch(Exception ex){
			System.out.print("exception sending redirect" + ex.getMessage());
		}
	}

	public UserAuthentication getAuthentication(HttpServletRequest request) {
		// to prevent CSRF attacks we still only allow authentication using a custom HTTP header
		// (it is up to the client to read our previously set cookie and put it in the header)
		String token = request.getHeader(AUTH_HEADER_NAME);
		if(token!=null) {
			System.out.print("received token from form header:"+token);
		}
		if(token == null){
			token = request.getParameter(AUTH_HEADER_NAME);
			if(token!=null) {
				System.out.print("received token from form parameter:"+token);
			}
		}
		if(token == null) {
			Cookie cookie = WebUtils.getCookie(request, AUTH_HEADER_NAME);
			if(null!=cookie) {
				token = cookie.getValue();
				if(token!=null) {
					System.out.print("received token from cookie:"+token);
				}
			}
		}
		if (token != null) {
			final MongoUser user = tokenHandler.parseUserFromToken(token);
			if (user != null) {
				return new UserAuthentication(user);
			}
		}
		return null;
	}

	/****
	private Cookie createCookieForToken(String token) {
		final Cookie authCookie = new Cookie(AUTH_COOKIE_NAME, token);
		authCookie.setPath("/");
		return authCookie;
	}***/
}
