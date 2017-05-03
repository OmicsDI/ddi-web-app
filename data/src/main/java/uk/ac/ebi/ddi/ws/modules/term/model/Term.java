package uk.ac.ebi.ddi.ws.modules.term.model;

/**
 * @author ypriverol
 */
public class Term {

    /**
     * The label of the term
     */
    String label    = null;

    /**
     * The Frequency of the term
     */
    String frequent = null;

    /**
     * Default constructor
     * @param label
     * @param frequent
     */
    public Term(String label, String frequent) {
        this.label = label;
        this.frequent = frequent;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getFrequent() {
        return frequent;
    }

    public void setFrequent(String frequent) {
        this.frequent = frequent;
    }
}
