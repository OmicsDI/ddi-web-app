package uk.ac.ebi.ddi.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.github.api.GitHub;
import org.springframework.social.github.api.GitHubUserProfile;
import org.springframework.social.facebook.api.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GithubController {

    @Autowired
    GitHub github;

    @RequestMapping(value = "/api/github/details", method = RequestMethod.GET)
    public GitHubUserProfile getSocialDetails() {
        return github.userOperations().getUserProfile();
    }
}
