package uk.ac.ebi.ddi.security.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.bson.types.ObjectId;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.social.security.SocialUserDetails;

import java.util.Collection;
import java.util.HashSet;

/**
 * Created by user on 3/12/2017.
 */

@Document(collection = "users")
public class MongoUser implements SocialUserDetails {
    @Id
    @NotEmpty
    String userId;

    @NotEmpty
    String userName;

    String accessToken;

    String roles;

    String orcid;

    String bio;

    String homepage;

    String email;

    String affiliation;

    Boolean isPublic;

    DataSet[] dataSets;

    String imageUrl;


    byte[] image;

    long expires;

    public UserShort[] getCoauthors() {
        return coauthors;
    }

    public void setCoauthors(UserShort[] coauthors) {
        this.coauthors = coauthors;
    }

    UserShort[] coauthors;

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getHomepage() {
        return homepage;
    }

    public void setHomepage(String homepage) {
        this.homepage = homepage;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAffiliation() {
        return affiliation;
    }

    public void setAffiliation(String affiliation) {
        this.affiliation = affiliation;
    }

    public Boolean getIsPublic() {
        return isPublic;
    }

    public void setIsPublic(Boolean aPublic) {
        isPublic = aPublic;
    }



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

    public DataSet[] getDataSets(){        return dataSets;    }
    public void setDataSets(DataSet[] val){
        this.dataSets = val;
    }

    public void setImage(byte[] image){
        this.image = image;
    }
    public byte[] getImage(){
        return this.image;
    }

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        final GrantedAuthority a = new GrantedAuthority(){
            @Override
            public String getAuthority() {
                return "USER";
            }
        };
        return new HashSet<GrantedAuthority>(){{ add(a); }};
    }

    @Override
    @JsonIgnore
    public String getPassword() {
        throw new IllegalStateException("password should never be used");
    }

    @Override
    @JsonIgnore
    public String getUsername() {
        return this.getUserName();
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }

    public long getExpires() {
        return expires;
    }

    public void setExpires(long expires) {
        this.expires = expires;
    }
}
