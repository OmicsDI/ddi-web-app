package uk.ac.ebi.ddi.ws.modules.seo.model;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by azorin on 31/07/2017.
 */
public class StructuredDataGraph {
    StructuredData[] graph;

    @JsonProperty("@graph")
    public StructuredData[] getGraph() {
        return graph;
    }

    public void setGraph(StructuredData[] graph) {
        this.graph = graph;
    }


}
