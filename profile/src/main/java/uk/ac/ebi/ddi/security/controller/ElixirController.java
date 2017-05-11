package uk.ac.ebi.ddi.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.elixir.api.Elixir;
import org.springframework.social.elixir.api.ElixirProfile;
import org.springframework.social.twitter.api.Twitter;
import org.springframework.social.twitter.api.TwitterProfile;
import org.springframework.social.facebook.api.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpMessageConverterExtractor;

@RestController
public class ElixirController {

    @Autowired
    Elixir elixir;

    @RequestMapping(value = "/api/elixir/details", method = RequestMethod.GET)
    public ElixirProfile getSocialDetails() {

        return elixir.userOperations().getUserProfile();
    }
}
