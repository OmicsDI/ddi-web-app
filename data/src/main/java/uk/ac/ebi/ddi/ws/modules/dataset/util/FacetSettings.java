package uk.ac.ebi.ddi.ws.modules.dataset.util;

import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by azorin on 22/06/2017.
 */
class FacetProperty{
    public String name;
    public String caption;
    public String parentFacetName;
    public String parentFacetValue;
}

@Document(collection = "settings")
public class FacetSettings {
        int maxFacetCount;
        FacetProperty[] facetProperties;
}
