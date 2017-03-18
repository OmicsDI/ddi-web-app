package uk.ac.ebi.ddi.security.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.filter.GenericFilterBean;
import uk.ac.ebi.ddi.security.service.TokenAuthenticationService;
import uk.ac.ebi.ddi.security.model.UserAuthentication;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Component
public class TokenAuthenticationFilter extends GenericFilterBean {

	private TokenAuthenticationService tokenAuthenticationService;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException,
            ServletException {

		//can not use Spring in filter
		//http://stackoverflow.com/questions/32494398/unable-to-autowire-the-service-inside-my-authentication-filter-in-spring
		if(tokenAuthenticationService==null){
			ServletContext servletContext = request.getServletContext();
			WebApplicationContext webApplicationContext = WebApplicationContextUtils.getWebApplicationContext(servletContext);
			tokenAuthenticationService = webApplicationContext.getBean(TokenAuthenticationService.class);
		}

		setAuthenticationFromHeader((HttpServletRequest) request);

		chain.doFilter(request, response);
	}

	private void setAuthenticationFromHeader(HttpServletRequest request) {
		final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (!(authentication instanceof UserAuthentication)) {
			final UserAuthentication userAuthentication = tokenAuthenticationService.getAuthentication(request);
			if (userAuthentication != null) {
				SecurityContextHolder.getContext().setAuthentication(userAuthentication);
			}
		}
	}
}