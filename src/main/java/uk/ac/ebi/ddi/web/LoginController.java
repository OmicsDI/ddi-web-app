package uk.ac.ebi.ddi.web;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.social.connect.Connection;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.orcid.api.OrcidApi;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;

@Controller
@RequestMapping("/api/login")
public class LoginController{

    @Inject
    @Qualifier("orcid")
    Connection<OrcidApi> orcid;

    @Inject
    @Qualifier("facebook")
    Connection<Facebook> facebook;

    @RequestMapping(method= RequestMethod.GET)
    @CrossOrigin()
    protected @ResponseBody
    String GetRedirectUrl(
                @RequestParam(value = "provider", required = true) String provider
            ) throws Exception {


        String url = "https://sandbox.orcid.org/oauth/signin?client_id=APP-FBTNY1E6990OKN73&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fsignin%2Forcid&scope=%2Fauthenticate&state=13725027-f513-4154-9774-d3e594f3206b";

        //return "http://www.google.com/?q=" + provider;

        return url;
    }
}