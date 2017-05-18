package uk.ac.ebi.ddi.security.model;

import java.util.List;

/**
 * Created by user on 3/14/2017.
 */
public class DataSet {
    String id;
    String source;
    String claimed;
    String name;
    List<String> omics_type = null;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getOmics_type() {
        return omics_type;
    }

    public void setOmics_type(List<String> omics_type) {
        this.omics_type = omics_type;
    }

    public DataSet(){}

    public DataSet( String id
                    ,String source
                    ,String claimed){
        this.id = id;
        this.source = source;
        this.claimed = claimed;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getClaimed() {
        return claimed;
    }

    public void setClaimed(String claimed) {
        this.claimed = claimed;
    }


}
