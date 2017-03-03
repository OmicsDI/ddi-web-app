package org.jyougo.springsocial;

public enum ServiceProvider {
    ORCID("/orcid", "orcid"), 
    Facebook("/facebook", "facebook");
    
    private String redirectUrl;
    private String id;
    
    ServiceProvider(String redirectUrl, String id) {
        this.redirectUrl = redirectUrl;
        this.id = id;
    }

    public String getRedirectUrl() {
        return redirectUrl;
    }
    public String getId() {
        return id;
    }
}
