package uk.ac.ebi.ddi.ws.modules.enrichment.model;

import java.util.ArrayList;
import java.util.List;

/**
 * This class handle the information concerning the synonyms for a word.
 * Created by mingze on 29/10/15.
 */
public class SynonymsForWord {
    String wordLabel;
    List<String> synonyms;

    public SynonymsForWord(String wordLabel) {
        this.wordLabel = wordLabel;
    }

    public String getWordLabel() {
        return wordLabel;
    }

    public void setWordLabel(String wordLabel) {
        this.wordLabel = wordLabel;
    }

    public List<String> getSynonyms() {
        return synonyms;
    }

    public void setSynonyms(List<String> synonyms) {
        this.synonyms = synonyms;
    }

    public void addSynonym(String synonym){
        if(this.synonyms == null) this.synonyms = new ArrayList<>();
        this.synonyms.add(synonym);
    }
}
