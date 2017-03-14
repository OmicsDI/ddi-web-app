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

    String orcid;

    //DataSet[] dataSets;

    public String getUserId(){
        return userId;
    }
    public void setUserId(String val){
        this.userId = val;
    }
    public String getUserName(){
        return userName;
    }
    public void setUserName(String val){
        this.userName = val;
    }
    public String getAccessToken(){
        return accessToken;
    }
    public void setAccessToken(String val){
        this.accessToken = val;
    }
    public String getRoles(){
        return roles;
    }
    public void setRoles(String val){
        this.roles = val;
    }
    public String getOrcid(){
        return orcid;
    }
    public void setOrcid(String val){
        this.orcid = val;
    }
    /*
    public DataSet[] getDataSets(){        return dataSets;    }
    public void setDataSet(DataSet[] val){
        this.dataSets = val;
    }
    */

}
