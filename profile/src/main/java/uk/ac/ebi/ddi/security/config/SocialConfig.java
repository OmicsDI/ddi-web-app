package uk.ac.ebi.ddi.security.config;

import java.lang.reflect.Field;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.social.UserIdSource;
import org.springframework.social.config.annotation.ConnectionFactoryConfigurer;
import org.springframework.social.config.annotation.EnableSocial;
import org.springframework.social.config.annotation.SocialConfigurerAdapter;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionFactoryLocator;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.connect.ConnectionSignUp;
import org.springframework.social.connect.mongo.MongoConnectionService;
import org.springframework.social.connect.mongo.MongoUsersConnectionRepository;
import org.springframework.social.connect.web.ConnectController;
import org.springframework.social.elixir.api.Elixir;
import org.springframework.social.elixir.connect.ElixirConnectionFactory;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.facebook.connect.FacebookConnectionFactory;
import org.springframework.social.github.api.GitHub;
import org.springframework.social.github.connect.GitHubConnectionFactory;
import org.europepmc.springframework.social.orcid.api.OrcidApi;
import org.europepmc.springframework.social.orcid.connect.OrcidConnectionFactory;
import org.europepmc.springframework.social.orcid.utils.OrcidConfig;
import org.europepmc.springframework.social.orcid.utils.OrcidConfigBroker;
import org.springframework.social.linkedin.api.LinkedIn;
import org.springframework.social.linkedin.connect.LinkedInConnectionFactory;
import org.springframework.social.twitter.api.Twitter;
import org.springframework.social.twitter.connect.TwitterConnectionFactory;

import uk.ac.ebi.ddi.security.UserAuthenticationUserIdSource;

@Configuration
@EnableSocial
public class SocialConfig extends SocialConfigurerAdapter {

	public SocialConfig(Environment env) throws Exception{

		OrcidConfig config = new OrcidConfig();

		config.setFrontendUrl(env.getProperty("orcid.frontend.url")); //"https://sandbox.orcid.org/"
		config.setApiUrl(env.getProperty("orcid.api.url"));//"https://api.sandbox.orcid.org/v1.2/"
		config.setPubApiUrl(env.getProperty("orcid.pub.url"));//"https://pub.sandbox.orcid.org/v1.2/"
		config.setAuthorizeUrl(env.getProperty("orcid.authorize.url"));//"https://sandbox.orcid.org/oauth/authorize"
		config.setAccessTokenUrl(env.getProperty("orcid.token.url"));//"https://sandbox.orcid.org/oauth/token"

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
		
		cfConfig.addConnectionFactory(new GitHubConnectionFactory(
				env.getProperty("github.clientId"),
				env.getProperty("github.clientSecret")));
		cfConfig.addConnectionFactory(new TwitterConnectionFactory(
				env.getProperty("twitter.consumerKey"),
				env.getProperty("twitter.consumerSecret")));

		cfConfig.addConnectionFactory(new ElixirConnectionFactory(
				env.getProperty("elixir.clientId"),
				env.getProperty("elixir.clientSecret")));

		cfConfig.addConnectionFactory(new LinkedInConnectionFactory(
				env.getProperty("linkedin.clientId"),
				env.getProperty("linkedin.clientSecret")));

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
	@Scope(value="request",proxyMode = ScopedProxyMode.INTERFACES)
	public GitHub github(ConnectionRepository repository){
		Connection<GitHub> connection = repository.findPrimaryConnection(GitHub.class);
		return connection != null ? connection.getApi() : null;
	}

	@Bean
	@Scope(value="request",proxyMode = ScopedProxyMode.INTERFACES)
	public Twitter twitter(ConnectionRepository repository){
		Connection<Twitter> connection = repository.findPrimaryConnection(Twitter.class);
		return connection != null ? connection.getApi() : null;
		}

	@Bean
	@Scope(value="request",proxyMode = ScopedProxyMode.INTERFACES)
	public Elixir elixir(ConnectionRepository repository){
		Connection<Elixir> connection = repository.findPrimaryConnection(Elixir.class);
		return connection != null ? connection.getApi() : null;
	}

	@Bean
	@Scope(value="request",proxyMode = ScopedProxyMode.INTERFACES)
	public LinkedIn linkedin(ConnectionRepository repository){
		Connection<LinkedIn> connection = repository.findPrimaryConnection(LinkedIn.class);
		return connection != null ? connection.getApi() : null;
	}

	@Bean
	public UserIdSource userIdSource(){
		return new UserAuthenticationUserIdSource();
	}

	/***********************************
	@Bean
	public ConnectController connectController(ConnectionFactoryLocator connectionFactoryLocator, ConnectionRepository connectionRepository) {
		return new ConnectController(connectionFactoryLocator,
				connectionRepository);
	}
	*************************************/
}
