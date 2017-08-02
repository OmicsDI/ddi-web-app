package uk.ac.ebi.ddi.ws.modules.seo.model;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by azorin on 31/07/2017.
 */
public class StructuredDataCitation {
     String type;
     String name;;

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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public StructuredDataAuthor getAuthor() {
        return author;
    }

    public void setAuthor(StructuredDataAuthor author) {
        this.author = author;
    }

    public StructuredDataAuthor getPublisher() {
        return publisher;
    }

    public void setPublisher(StructuredDataAuthor publisher) {
        this.publisher = publisher;
    }

    String url;
     StructuredDataAuthor author;
     StructuredDataAuthor publisher;
}
