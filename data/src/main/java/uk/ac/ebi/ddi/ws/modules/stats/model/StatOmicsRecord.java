package uk.ac.ebi.ddi.ws.modules.stats.model;

/**
 * For all the starts we will use the record StatOmicsRecord for the datasets No.of each Omics per year:
 *
 *
 * @author Yasset Perez-Riverol yperz@ebi.ac.uk
 */
public class StatOmicsRecord {

    private String year;

    private String genomics;
    private String metabolomics;
    private String proteomics;
    private String transcriptomics;

    public StatOmicsRecord(String year, String genomicsNo, String metabolomicsNo, String proteomicsNo, String transcriptomicsNo) {
        this.year = year;
        this.genomics = genomicsNo;
        this.metabolomics = metabolomicsNo;
        this.proteomics = proteomicsNo;
        this.transcriptomics = transcriptomicsNo;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getGenomics() {
        return genomics;
    }

    public void setGenomics(String genomicsNo) {
        this.genomics = genomicsNo;
    }

    public String getMetabolomics() {
        return metabolomics;
    }

    public void setMetabolomics(String metabolomicsNo) {
        this.metabolomics = metabolomicsNo;
    }

    public String getProteomics() {
        return proteomics;
    }

    public void setProteomics(String proteomicsNo) {
        this.proteomics = proteomicsNo;
    }

    public String getTranscriptomics() {
        return transcriptomics;
    }

    public void setTranscriptomics(String transcriptomics) {
        this.transcriptomics = transcriptomics;
    }
}
