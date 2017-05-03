package uk.ac.ebi.ddi.ws.modules.stats.model;

/**
 * For all the starts we will use the record StatRecord that contain the value of the property and the value
 * for example number of entries in the resource:
 *    PRIDE   3000
 *
 * @author Yasset Perez-Riverol yperz@ebi.ac.uk
 */
public class StatRecord {

    private String label;

    private String id;

    private String value;

    public StatRecord(String label, String value, String id) {
        this.label = label;
        this.value = value;
        this.id    = id;
    }

    public String getName() {
        return label;
    }

    public void setName(String label) {
        this.label = label;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
