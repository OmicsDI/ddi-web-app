package uk.ac.ebi.ddi.security.model;

/**
 * Created by user on 3/14/2017.
 */
public class DataSet {
    String dataSetId;
    String source;
    String claimed;

    public DataSet(){}

    public DataSet( String dataSetId
                    ,String source
                    ,String claimed){
        this.dataSetId = dataSetId;
        this.source = source;
        this.claimed = claimed;
    }

    public String getDataSetId() {
        return dataSetId;
    }

    public void setDataSetId(String dataSetId) {
        this.dataSetId = dataSetId;
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
