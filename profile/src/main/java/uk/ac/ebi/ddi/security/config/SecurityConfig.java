package uk.ac.ebi.ddi.security.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.ObjectPostProcessor;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.security.web.authentication.preauth.AbstractPreAuthenticatedProcessingFilter;
import org.springframework.social.UserIdSource;
import org.springframework.social.security.SocialAuthenticationFilter;
import org.springframework.social.security.SpringSocialConfigurer;
import uk.ac.ebi.ddi.security.SocialAuthenticationSuccessHandler;
import uk.ac.ebi.ddi.security.StatelessAuthenticationFilter;
import uk.ac.ebi.ddi.security.service.MongoUserDetailsService;

@EnableWebSecurity
@Configuration
@Order(1)
@PropertySources(value = {@PropertySource("classpath:application.properties")})
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	//To resolve ${} in @Value
	@Bean
	public static PropertySourcesPlaceholderConfigurer propertyConfigInDev() {
		return new PropertySourcesPlaceholderConfigurer();
	}

	@Autowired
	private SocialAuthenticationSuccessHandler socialAuthenticationSuccessHandler;

	@Autowired
	private StatelessAuthenticationFilter statelessAuthenticationFilter;

	@Autowired
	private UserIdSource userIdSource;

	@Autowired
	private MongoUserDetailsService mongoUserDetailsService;

	public SecurityConfig() {
		super(true);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// Set a custom successHandler on the SocialAuthenticationFilter
		final SpringSocialConfigurer socialConfigurer = new SpringSocialConfigurer();
		socialConfigurer.addObjectPostProcessor(new ObjectPostProcessor<SocialAuthenticationFilter>() {
			@Override
			public <O extends SocialAuthenticationFilter> O postProcess(O socialAuthenticationFilter) {
				socialAuthenticationFilter.setAuthenticationSuccessHandler(socialAuthenticationSuccessHandler);
				return socialAuthenticationFilter;
			}
		});

		//.headers().cacheControl().and()
		http.authorizeRequests()

				//allow anonymous font and template requests
				.antMatchers("/").permitAll()
				.antMatchers("/index.html").permitAll()

				.antMatchers("/favicon.ico").permitAll()
				.antMatchers("/resources/**").permitAll()

				//allow anonymous calls to social login
				.antMatchers("/auth/**").permitAll()

				.antMatchers("/signin/**").permitAll()

				//allow anonymous GETs to API
				.antMatchers(HttpMethod.GET, "/api/**").permitAll()

				//defined Admin only API area
				.antMatchers("/admin/**").hasRole("ADMIN")

				//all other request need to be authenticated
				.antMatchers(HttpMethod.GET, "/api/users/current/details").hasRole("USER")
				.anyRequest().hasRole("USER").and()

				.exceptionHandling().and().anonymous().and().servletApi().and()

				// add custom authentication filter for complete stateless JWT based authentication
				.addFilterBefore(statelessAuthenticationFilter, AbstractPreAuthenticatedProcessingFilter.class)

				// apply the configuration from the socialConfigurer (adds the SocialAuthenticationFilter)
				.apply(socialConfigurer.userIdSource(userIdSource));
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(mongoUserDetailsService);
	}

	@Override
	protected UserDetailsService userDetailsService() {
		return mongoUserDetailsService;
	}

}
