package uk.ac.ebi.ddi.ws.modules.publication.model;

/**
 * This class handle the information concerning the publication such as abstract, etc .
 *
 * @author ypriverol
 */
public class PublicationDetail {

    private String id;

    private String source;

    private String[] authors;

    private String[] pubAbstract;

    private String journal;

    private String issue;

    private String date;

    private String pagination;

    private String[] keywords;

    private String title;

    private String[] affiliation;

    private String volume;


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

    public String[] getAuthors() {
        return authors;
    }

    public void setAuthors(String[] authors) {
        this.authors = authors;
    }

    public String[] getPubAbstract() {
        return pubAbstract;
    }

    public void setPubAbstract(String[] pubAbstract) {
        this.pubAbstract = pubAbstract;
    }

    public String getJournal() {
        return journal;
    }

    public void setJournal(String journal) {
        this.journal = journal;
    }

    public String getIssue() {
        return issue;
    }

    public void setIssue(String issue) {
        this.issue = issue;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getPagination() {
        return pagination;
    }

    public void setPagination(String pagination) {
        this.pagination = pagination;
    }

    public String[] getKeywords() {
        return keywords;
    }

    public void setKeywords(String[] keywords) {
        this.keywords = keywords;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public String[] getAffiliation() {
        return affiliation;
    }

    public void setAffiliation(String[] affiliation) {
        this.affiliation = affiliation;
    }

    public String getVolume() {
        return volume;
    }

    public void setVolume(String volume) {
        this.volume = volume;
    }
}
