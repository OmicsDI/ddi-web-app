package uk.ac.ebi.ddi.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.connect.UsersConnectionRepository;
import org.springframework.social.connect.mongo.MongoUsersConnectionRepository;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import uk.ac.ebi.ddi.security.model.DataSet;
import uk.ac.ebi.ddi.security.model.MongoUser;
import uk.ac.ebi.ddi.security.model.UserAuthentication;
import uk.ac.ebi.ddi.security.repo.MongoUserDetailsRepository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by user on 3/17/2017.
 */
@RestController
public class DataSetController {
    private MongoUserDetailsRepository mongoUserDetailsRepository;

    @Autowired
    public DataSetController(MongoUserDetailsRepository mongoUserDetailsRepository){
        this.mongoUserDetailsRepository = mongoUserDetailsRepository;
    }

    @RequestMapping(value = "/api/users/{userID}/datasets", method = RequestMethod.POST)
    @CrossOrigin
    public void addUserDataSet(@PathVariable String userID, @RequestBody DataSet dataSet) {

        MongoUser user = mongoUserDetailsRepository.findByUserId(userID);

        DataSet[] dataSets = user.getDataSets();

        DataSet[] result;
        if(null==dataSets) {
            result = new DataSet[1];
        }else {
             result = Arrays.copyOf(dataSets, dataSets.length + 1);
        }

        result[result.length-1] = dataSet;

        user.setDataSets(result);

        mongoUserDetailsRepository.save(user);
    }

    @RequestMapping(value = "/api/users/{userID}/datasets", method = RequestMethod.PUT)
    @CrossOrigin
    public void setUserDataSet(@PathVariable String userID, @RequestBody DataSet[] dataSets) {
        MongoUser user = mongoUserDetailsRepository.findByUserId(userID);
        user.setDataSets(dataSets);
        mongoUserDetailsRepository.save(user);
    }

}
