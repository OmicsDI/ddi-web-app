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
import uk.ac.ebi.ddi.security.repo.MongoUserDetailsRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Created by user on 3/12/2017.
 */

@Service
public class MongoUserDetailsService implements UserDetailsService, SocialUserDetailsService {

    private MongoUserDetailsRepository mongoUserDetailsRepository;

    @Autowired
    MongoUserDetailsService(MongoUserDetailsRepository mongoUserDetailsRepository){
        this.mongoUserDetailsRepository = mongoUserDetailsRepository;
    }

    public MongoUser findById(String Id){

        MongoUser mongoUser = mongoUserDetailsRepository.findByUserId(Id);

        if(null==mongoUser)
            return null;

        MongoUser user = new MongoUser();

        String UserName = mongoUser.getUserName();

        user.setUserId(mongoUser.getUserId());

        user.setUserName(UserName);

        return user;
    }
    public MongoUser findByUsername(String name){

        MongoUser mongoUser = mongoUserDetailsRepository.findByName(name);

        if(null==mongoUser)
            return null;

        MongoUser user = new MongoUser();

        String UserName = mongoUser.getUserName();

        user.setUserId(mongoUser.getUserId());

        user.setUserName(UserName);

        return user;
    }
    public MongoUser findByProviderIdAndProviderUserId(String Id1, String Id2){
        return null;
    }

    public void save(MongoUser u){
        //TODO:calculate unique UID
        String UserId = u.getUserId();

        if(null==UserId){
            /*** Long newUserId = 0L;
            PageRequest request = new PageRequest(0, 1, new Sort(Sort.Direction.DESC, "userId"));
            List<MongoUser> foundUsers = mongoUserDetailsRepository.findByUserIdNotNull(request).getContent();
            if(foundUsers.size() > 0) {
                MongoUser mongoUser = foundUsers.get(0);
                if (null != mongoUser) {
                    newUserId = Long.parseLong(mongoUser.getUserId()) + 1;
                }
            }
            UserId = newUserId.toString(); ***/
            UserId = getToken(8); //UUID.randomUUID().toString();
            u.setUserId(UserId);
        }
        //TODO: roles
        u.setRoles("USER,ADMIN");
        mongoUserDetailsRepository.save(u);
    }

    static public String getToken(int chars) {
        String CharSet = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ1234567890";
        String Token = "";
        Random random = new Random();
        for (int a = 1; a <= chars; a++) {
            Token += CharSet.charAt(random.nextInt(CharSet.length()));
        }
        return Token;
    }

    public void saveAndFlush(MongoUser u){
        save(u);

        return;
    }

    public List<MongoUser> findAll(){
        return new ArrayList<MongoUser>();
    }

    public int count(){
        return 0;
    }

    @Override
    public MongoUser loadUserByUsername(String s) throws UsernameNotFoundException {
        return findByUsername(s);
    }

    @Override
    public SocialUserDetails loadUserByUserId(String s) throws UsernameNotFoundException {
        return findById(s);
    }
}
