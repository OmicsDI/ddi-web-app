package uk.ac.ebi.ddi.ws.modules.publication.model;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Yasset Perez-Riverol (ypriverol@gmail.com)
 * @date 11/06/2015
 */
public class PublicationResult {

    private Integer count;

    private List<PublicationDetail> publications;

    public PublicationResult(){
        publications = new ArrayList<>();
    }

    public PublicationResult(Integer count, List<PublicationDetail> publications) {
        this.count = count;
        this.publications = publications;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public List<PublicationDetail> getPublications() {
        return publications;
    }

    public void setPublications(List<PublicationDetail> publications) {
        this.publications = publications;
    }
}
