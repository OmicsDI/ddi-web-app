package uk.ac.ebi.ddi.ws.modules.enrichment.model;

import java.util.ArrayList;
import java.util.List;

/**
 * This class handle the information concerning the synonyms for a dataset.
 * Created by mingze on 29/10/15.
 */
public class SynonymsForDataset {
    String accession;
    String database;
    List<SynonymsForWord> synonymsList;

    public SynonymsForDataset(String accession, String database) {
        this.accession = accession;
        this.database = database;
        this.synonymsList = new ArrayList<>();
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

    public List<SynonymsForWord> getSynonymsList() {
        return synonymsList;
    }

    public void setSynonymsList(List<SynonymsForWord> synonymsList) {
        this.synonymsList = synonymsList;
    }

    public void addSynonymsForWordIntoList(SynonymsForWord synonymsForWord) {
        this.synonymsList.add(synonymsForWord);
    }
}
