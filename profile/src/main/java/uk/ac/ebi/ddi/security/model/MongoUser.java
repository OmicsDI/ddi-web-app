package uk.ac.ebi.ddi.security.model;

import org.bson.types.ObjectId;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by user on 3/12/2017.
 */

@Document(collection = "users")
public class MongoUser {
    @Id
    @NotEmpty
    String userId;

    @NotEmpty
    String userName;

    String accessToken;

    String roles;

    public String getUserId(){
        return userId;
    }
    public void setUserId(String userId){
        this.userId = userId;
    }
    public String getUserName(){
        return userName;
    }
    public void setUserName(String username){
        this.userName = username;
    }
    public String getAccessToken(){
        return accessToken;
    }
    public void setAccessToken(String accessToken){
        this.accessToken = accessToken;
    }
    public String getRoles(){
        return roles;
    }
    public void setRoles(String roles){
        this.roles = roles;
    }
}
