package uk.ac.ebi.ddi.ws.modules.seo.model;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by azorin on 31/07/2017.
 */
public class StructuredDataAction {
        String type;

    @JsonProperty("@type")
    public String getType() {
        return type;
    }


    public void setType(String type) {
        this.type = type;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    @JsonProperty("query-input")
    public String getQueryInput() {
        return queryInput;
    }

    public void setQueryInput(String queryInput) {
        this.queryInput = queryInput;
    }

    String target;
        String queryInput;
}
