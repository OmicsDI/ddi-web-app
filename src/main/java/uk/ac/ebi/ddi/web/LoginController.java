package uk.ac.ebi.ddi.web;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.social.connect.Connection;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.orcid.api.OrcidApi;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/user/logout")
public class LoginController{

    @Inject
    @Qualifier("orcid")
    Connection<OrcidApi> orcid;

    @Inject
    @Qualifier("facebook")
    Connection<Facebook> facebook;

    @Inject
    @Qualifier("dataSource")
    org.springframework.jdbc.datasource.DriverManagerDataSource dataSource;


    @RequestMapping(method= RequestMethod.POST)
    @CrossOrigin()
    protected
    String LogOut(HttpSession session) throws Exception {
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);

        jdbcTemplate.execute("delete from UserConnection");

        jdbcTemplate.execute("delete from authorities");

        jdbcTemplate.execute("delete from users");

        jdbcTemplate.execute("COMMIT");

        session.invalidate();

        String url = "https://sandbox.orcid.org/oauth/signin?client_id=APP-FBTNY1E6990OKN73&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fsignin%2Forcid&scope=%2Fauthenticate&state=13725027-f513-4154-9774-d3e594f3206b";

        return "redirect:/#/";
    }
}