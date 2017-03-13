package uk.ac.ebi.ddi.security.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.social.connect.mongo.MongoConnection;
import org.springframework.social.security.SocialUserDetails;
import org.springframework.social.security.SocialUserDetailsService;
import org.springframework.stereotype.Service;
import uk.ac.ebi.ddi.security.model.MongoUser;
import uk.ac.ebi.ddi.security.model.User;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

/**
 * Created by user on 3/12/2017.
 */

@Service
public class MongoUserDetailsService implements UserDetailsService, SocialUserDetailsService {

    private MongoTemplate mongoTemplate;

    @Autowired
    MongoUserDetailsService(MongoTemplate mongoTemplate){
        this.mongoTemplate = mongoTemplate;
    }

    public User findById(Long Id){
        Query q = query(where("UserId").is(Id.toString()));

        q.fields().include("UserId").include("UserName").include("AccessToken");

        List<MongoUser> results = mongoTemplate.find(q, MongoUser.class);

        if(0==results.size())
            return null;

        User user = new User();

        Long UserId = Long.parseLong(results.get(0).getUserId());

        String UserName = results.get(0).getUserName();

        user.setId(UserId);

        user.setUsername(UserName);

        return user;
    }
    public User findByUsername(String name){
        Query q = query(where("UserName").is(name));

        q.fields().include("UserId").include("UserName").include("AccessToken");

        List<MongoUser> results = mongoTemplate.find(q, MongoUser.class);

        if(0==results.size())
            return null;

        User user = new User();

        Long UserId = Long.parseLong(results.get(0).getUserId());

        String UserName = results.get(0).getUserName();

        user.setId(UserId);

        user.setUsername(UserName);

        return user;
    }
    public User findByProviderIdAndProviderUserId(String Id1, String Id2){
        return null;
    }

    public void save(User u){
        Long userId = u.getId();

        if(null==userId){
            Query query = new Query();
            query.with(new Sort(Sort.Direction.DESC, "userId"));
            query.limit(1);
            MongoUser mongoUser = mongoTemplate.findOne(query, MongoUser.class);
            if(null==mongoUser){
                userId = 0L;
            }else{
                userId = Long.parseLong(mongoUser.getUserId()) + 1;
            }
        }

        MongoUser mongoUser = new MongoUser();
        mongoUser.setUserId(userId.toString());
        mongoUser.setUserName(u.getUsername());
        mongoUser.setAccessToken(u.getAccessToken());
        mongoUser.setRoles("USER,ADMIN"); //TODO

        mongoTemplate.save(mongoUser);

        u.setId(userId);
    }

    public void saveAndFlush(User u){
        save(u);

        return;
    }

    public List<User> findAll(){
        return new ArrayList<User>();
    }

    public int count(){
        return 0;
    }

    @Override
    public User loadUserByUsername(String s) throws UsernameNotFoundException {
        return findByUsername(s);
    }

    @Override
    public SocialUserDetails loadUserByUserId(String s) throws UsernameNotFoundException {
        return findById(Long.parseLong(s));
    }
}
