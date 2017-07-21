package uk.ac.ebi.ddi.security.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
 * Created by azorin on 21/07/2017.
 */
@Document(collection = "watcheddataset")
public class WatchedDataset {
    @Id
    public String id;

    public String userId;
    public String source;
    public String accession;
}
