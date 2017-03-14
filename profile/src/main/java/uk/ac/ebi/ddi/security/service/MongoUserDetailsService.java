package uk.ac.ebi.ddi.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.social.security.SocialUserDetails;
import org.springframework.social.security.SocialUserDetailsService;
import org.springframework.stereotype.Service;
import uk.ac.ebi.ddi.security.model.MongoUser;
import uk.ac.ebi.ddi.security.model.User;
import uk.ac.ebi.ddi.security.repo.MongoUserDetailsRepository;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by user on 3/12/2017.
 */

@Service
public class MongoUserDetailsService implements UserDetailsService, SocialUserDetailsService {

    private MongoUserDetailsRepository mongoUserDetailsRepository;

    @Autowired
    MongoUserDetailsService(MongoUserDetailsRepository mongoUserDetailsRepository){ this.mongoUserDetailsRepository = mongoUserDetailsRepository;
    }

    public User findById(Long Id){

        MongoUser mongoUser = mongoUserDetailsRepository.findByUserId(Id.toString());

        if(null==mongoUser)
            return null;

        User user = new User();

        Long UserId = Long.parseLong(mongoUser.getUserId());

        String UserName = mongoUser.getUserName();

        user.setId(UserId);

        user.setUsername(UserName);

        return user;
    }
    public User findByUsername(String name){

        MongoUser mongoUser = mongoUserDetailsRepository.findByName(name);

        if(null==mongoUser)
            return null;

        User user = new User();

        Long UserId = Long.parseLong(mongoUser.getUserId());

        String UserName = mongoUser.getUserName();

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
            // Keep that in a constant if it stays the same
            PageRequest request = new PageRequest(0, 1, new Sort(Sort.Direction.DESC, "userId"));
            MongoUser mongoUser = mongoUserDetailsRepository.findByUserIdNotNull(request).getContent().get(0);

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

        mongoUserDetailsRepository.save(mongoUser);

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
