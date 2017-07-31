package uk.ac.ebi.ddi.ws.modules.seo.model;


import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by azorin on 28/07/2017.
 *
 *
 "@context": "http://schema.org",
 "@type": "WebPage",
 "name": "Browse",
 "url": "http://www.omicsdi.org/search?q=*:*",
 "description" : "Browse and Search for OmicsDI Datasests",
 "image": "http://www.omicsdi.org/static/images/logo/search.png",
 "keywords" : "OmicsDI, Search, Browsers, Datasets, Searching"
 *
 *
 *
 */
public class StructuredData {
    String context;
    String type;
    String name;
    String url;
    String keywords;
    String description;
    String variableMeasured;
    String alternateName;
    String logo;

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    String email;

    public String getAlternateName() {
        return alternateName;
    }

    public void setAlternateName(String alternativeName) {
        this.alternateName = alternativeName;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public StructuredDataAction getPotentialAction() {
        return potentialAction;
    }

    public void setPotentialAction(StructuredDataAction potentialAction) {
        this.potentialAction = potentialAction;
    }

    String image;
    StructuredDataAction potentialAction;

    public String getVariableMeasured() {
        return variableMeasured;
    }

    public void setVariableMeasured(String variableMeasured) {
        this.variableMeasured = variableMeasured;
    }

    public String getSameAs() {
        return sameAs;
    }

    public void setSameAs(String sameAs) {
        this.sameAs = sameAs;
    }

    String sameAs;

    public StructuredDataAuthor[] getCreator() {
        return creator;
    }

    public void setCreator(StructuredDataAuthor[] creator) {
        this.creator = creator;
    }

    public StructuredDataCitation getCitation() {
        return citation;
    }

    public void setCitation(StructuredDataCitation citation) {
        this.citation = citation;
    }

    StructuredDataAuthor[] creator;
    StructuredDataCitation citation;

    public StructuredDataImage getPrimaryImageOfPage() {
        return primaryImageOfPage;
    }

    public void setPrimaryImageOfPage(StructuredDataImage primaryImageOfPage) {
        this.primaryImageOfPage = primaryImageOfPage;
    }

    StructuredDataImage primaryImageOfPage;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @JsonProperty("@context")
    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
    }

    @JsonProperty("@type")
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


}
