package uk.ac.ebi.ddi.ws.modules.dataset.model;

import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

/**
 * Created by yperez on 20/06/2016.
 */

@XmlRootElement(name = "similar")
public class DatasetSimilar implements Serializable{

    private static final long serialVersionUID = 1L;

    String accession;

    String database;

    String[] omics_type;

    String relationType;

    public DatasetSimilar(){}

    public DatasetSimilar(String accession, String database, String relationType) {
        this.accession = accession;
        this.database = database;
        this.relationType = relationType;
    }

    public String getAccession() {
        return accession;
    }

    public void setAccession(String accession) {
        this.accession = accession;
    }

    public String getDatabase() {
        return database;
    }

    public void setDatabase(String database) {
        this.database = database;
    }

    public String getRelationType() {
        return relationType;
    }

    public void setRelationType(String relationType) {
        this.relationType = relationType;
    }

    public String[] getOmics_type() {
        return omics_type;
    }

    public void setOmics_type(String[] omics_type) {
        this.omics_type = omics_type;
    }
}
