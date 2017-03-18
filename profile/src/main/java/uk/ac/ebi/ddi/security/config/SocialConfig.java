package uk.ac.ebi.ddi.security.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.*;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.social.UserIdSource;
import org.springframework.social.config.annotation.ConnectionFactoryConfigurer;
import org.springframework.social.config.annotation.EnableSocial;
import org.springframework.social.config.annotation.SocialConfigurerAdapter;
import org.springframework.social.connect.*;
import org.springframework.social.connect.mongo.*;
import org.springframework.social.connect.web.ConnectController;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.facebook.connect.FacebookConnectionFactory;
import org.springframework.social.orcid.api.OrcidApi;
import org.springframework.social.orcid.connect.OrcidConnectionFactory;
import org.springframework.social.orcid.utils.OrcidConfig;
import org.springframework.social.orcid.utils.OrcidConfigBroker;
import uk.ac.ebi.ddi.security.UserAuthenticationUserIdSource;

import java.lang.reflect.Field;

import org.springframework.social.connect.mongo.MongoConnectionService;

@Configuration
@EnableSocial
public class SocialConfig extends SocialConfigurerAdapter {

	public SocialConfig() throws Exception{
		OrcidConfig config = new OrcidConfig();
		config.setFrontendUrl("https://sandbox.orcid.org/");
		config.setApiUrl("https://api.sandbox.orcid.org/v1.2/");
		config.setPubApiUrl("https://pub.sandbox.orcid.org/v1.2/");
		config.setAuthorizeUrl("https://sandbox.orcid.org/oauth/authorize");
		config.setAccessTokenUrl("https://sandbox.orcid.org/oauth/token");

		Field stringField = OrcidConfigBroker.class.getDeclaredField("orcidConfig");
		stringField.setAccessible(true);

		stringField.set(null,config);
	}

	@Bean
	public TextEncryptor textEncryptor() {
		return Encryptors.noOpText();
	}

	@Bean
	public static PropertySourcesPlaceholderConfigurer propertyConfigInDev() {
		return new PropertySourcesPlaceholderConfigurer();
	}

	@Autowired
	private ConnectionSignUp dummySignUpHandler;

	//@Autowired
	//private O2UserDetailsService userDetailsService;

	@Autowired
	private TextEncryptor textEncryptor;

	@Autowired
	private MongoConnectionService mongoConnectionService;

	@Override
	public void addConnectionFactories(ConnectionFactoryConfigurer cfConfig, Environment env) {
		cfConfig.addConnectionFactory(new FacebookConnectionFactory(
				env.getProperty("facebook.appKey"),
				env.getProperty("facebook.appSecret")));

		cfConfig.addConnectionFactory(new OrcidConnectionFactory(
				env.getProperty("orcid.clientId"),
				env.getProperty("orcid.clientSecret")));
	}

	@Override
	public UserIdSource getUserIdSource() {
		// retrieve the UserId from the UserAuthentication in the security context
		return new UserAuthenticationUserIdSource();
	}

	@Override
	public MongoUsersConnectionRepository getUsersConnectionRepository(ConnectionFactoryLocator connectionFactoryLocator) {

		MongoUsersConnectionRepository mongoUsersConnectionRepository =
				new MongoUsersConnectionRepository(mongoConnectionService, connectionFactoryLocator, textEncryptor);

		mongoUsersConnectionRepository.setConnectionSignUp(dummySignUpHandler);

		return mongoUsersConnectionRepository;

		/*
		SimpleUsersConnectionRepository usersConnectionRepository =
				new SimpleUsersConnectionRepository(userDetailsService, connectionFactoryLocator);


		// if no local user record exists yet for a facebook's user id
		// automatically create a User and add it to the database
		//usersConnectionRepository.setConnectionSignUp(autoSignUpHandler);

		return usersConnectionRepository;
		*/
	}

	@Bean
	@Scope(value = "request", proxyMode = ScopedProxyMode.INTERFACES)
	public Facebook facebook(ConnectionRepository repository) {
		Connection<Facebook> connection = repository.findPrimaryConnection(Facebook.class);
		return connection != null ? connection.getApi() : null;
	}

	@Bean
	@Scope(value = "request", proxyMode = ScopedProxyMode.INTERFACES)
	public OrcidApi orcid(ConnectionRepository repository) {
		Connection<OrcidApi> connection = repository.findPrimaryConnection(OrcidApi.class);
		return connection != null ? connection.getApi() : null;
	}

	@Bean
	public UserIdSource userIdSource(){
		return new UserAuthenticationUserIdSource();
	}

	@Bean
	public ConnectController connectController(ConnectionFactoryLocator connectionFactoryLocator, ConnectionRepository connectionRepository) {
		return new ConnectController(connectionFactoryLocator,
				connectionRepository);
	}
}
