package uk.ac.ebi.ddi.ws.modules.seo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by azorin on 31/07/2017.
 */
public class StructuredDataImage {
    private String type;
    private String author;


    @JsonProperty("@type")
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getContentLocation() {
        return contentLocation;
    }

    public void setContentLocation(String contentLocation) {
        this.contentLocation = contentLocation;
    }

    public String getContentUrl() {
        return contentUrl;
    }

    public void setContentUrl(String contentUrl) {
        this.contentUrl = contentUrl;
    }

    private String contentLocation;
    private String contentUrl;
}
