package uk.ac.ebi.ddi.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.connect.UsersConnectionRepository;
import org.springframework.social.connect.mongo.MongoUsersConnectionRepository;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.orcid.api.OrcidApi;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import uk.ac.ebi.ddi.security.model.MongoUser;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by user on 3/17/2017.
 */
@RestController
public class ConnectionController {
    private MongoUsersConnectionRepository mognoUsersConnectionRepository;

    @Autowired
    public ConnectionController(UsersConnectionRepository usersConnectionRepository){
        this.mognoUsersConnectionRepository =  (MongoUsersConnectionRepository)usersConnectionRepository;
    }

    @RequestMapping(value = "/api/users/{UserID}/connections", method = RequestMethod.GET)
    @CrossOrigin
    public String[] getUserConnections(@PathVariable String UserID) {
        List<Connection<?>> connections = this.mognoUsersConnectionRepository.getConnections(UserID);

        List<String> result = new ArrayList<String>();

        for (Connection<?> connection : connections){
            if(connection.getApi() instanceof Facebook)
                result.add("facebook");
            if(connection.getApi() instanceof OrcidApi)
                result.add("orcid");
        }

        //String[] stringArray = Arrays.copyOf(connections.keySet().toArray(), connections.keySet().size(), String[].class);
        return result.toArray( new String[result.size()]);
    }
}
