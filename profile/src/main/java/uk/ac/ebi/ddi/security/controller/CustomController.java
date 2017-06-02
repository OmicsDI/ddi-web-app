package uk.ac.ebi.ddi.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.social.connect.ConnectionFactoryLocator;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.connect.web.ConnectController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by user on 6/2/2017.
 */

    @Controller
    @RequestMapping("/connect")
    public class CustomController extends ConnectController {

    @Autowired
    Environment env;

    public CustomController(ConnectionFactoryLocator connectionFactoryLocator,
                                ConnectionRepository connectionRepository) {
            super(connectionFactoryLocator, connectionRepository);
        }

        @Override
        protected String connectedView(String providerId) {
            final String targetUrl = env.getRequiredProperty("security.targetUrl");

            return "redirect:" + targetUrl;
        }
    }
