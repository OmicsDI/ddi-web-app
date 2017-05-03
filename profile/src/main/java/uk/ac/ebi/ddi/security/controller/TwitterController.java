package uk.ac.ebi.ddi.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.twitter.api.Twitter;
import org.springframework.social.twitter.api.TwitterProfile;
import org.springframework.social.facebook.api.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TwitterController {

    @Autowired
    Twitter twitter;

    @RequestMapping(value = "/api/twitter/details", method = RequestMethod.GET)
    public TwitterProfile getSocialDetails() {
        return twitter.userOperations().getUserProfile();
    }
}
