package uk.ac.ebi.ddi.ws.modules.dataset.model;

/**
 * @author ypriverol
 */
public class PubmedPublication {

    /**
     * The PMID of the Pubmed term
     */
    String id    = null;

    /**
     * The publication date of the Pubmed term
     */
    String publicationDate = null;

    /**
     * The title of the Pubmed term
     */
    String title = null;

    /**
     * The abstract of the Pubmed term
     */
    String pubabstract = null;

    /**
     * The interesting colorful cycle of the Pubmed term
     */
    String cycle = null;

    /**
     * Author List of the manuscript
     */
    String authorList = null;

    /**
     * Citation of the manuscript
     */
    String citation   = null;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(String publicationDate) {
        this.publicationDate = publicationDate;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPubabstract() {
        return pubabstract;
    }

    public void setPubabstract(String pubabstract) {
        this.pubabstract = pubabstract;
    }

    public String getCycle() {
        return cycle;
    }

    public void setCycle(String cycle) {
        this.cycle = cycle;
    }

    public String getAuthorList() {
        return authorList;
    }

    public void setAuthorList(String authorList) {
        this.authorList = authorList;
    }

    public String getCitation() {
        return citation;
    }

    public void setCitation(String citation) {
        this.citation = citation;
    }
}
