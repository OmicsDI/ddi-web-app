package uk.ac.ebi.ddi.ws.modules.seo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by azorin on 31/07/2017.
 */
public class StructuredDataAuthor {
    private String type;
    private String name;


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
