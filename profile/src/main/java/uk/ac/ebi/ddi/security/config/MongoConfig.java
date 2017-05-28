package uk.ac.ebi.ddi.security.config;

import com.mongodb.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by user on 3/16/2017.
 */
@Configuration
@PropertySource({ "classpath:application.properties" })
public class MongoConfig extends AbstractMongoConfiguration {

    @Autowired
    Environment env;

    @Override
    public String getDatabaseName(){
        return env.getRequiredProperty("mongo.name");
    }

    @Override
    @Bean
    public Mongo mongo() throws Exception {

        ServerAddress serverAddress = new ServerAddress(env.getRequiredProperty("mongo.host"));
        List<MongoCredential> credentials = new ArrayList<>();
        credentials.add(MongoCredential.createCredential(
                env.getRequiredProperty("mongo.username"),
                env.getRequiredProperty("mongo.authenticationDatabase"),
                env.getRequiredProperty("mongo.password").toCharArray()
        ));
        System.out.println(credentials.toString());

        MongoClientOptions options = new MongoClientOptions.Builder()
                .build();

        MongoClient mongoClient =new MongoClient(serverAddress, credentials);

        return mongoClient;
    }

}