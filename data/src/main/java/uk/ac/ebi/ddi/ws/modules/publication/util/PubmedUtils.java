package uk.ac.ebi.ddi.ws.modules.publication.util;


import uk.ac.ebi.ddi.ebe.ws.dao.model.common.Entry;
import uk.ac.ebi.ddi.ebe.ws.dao.model.common.QueryResult;

import java.util.ArrayList;
import java.util.List;

import uk.ac.ebi.ddi.ws.modules.publication.model.PublicationDetail;
import uk.ac.ebi.ddi.ws.util.Constants;


/**
 * @ypriverol
 */
public class PubmedUtils {

    /**
     * Retirve the List of publications from the QueryResult
     * @param result
     * @return
     */
   public static List<PublicationDetail> transformPublication(QueryResult result){

       List<PublicationDetail> publications = new ArrayList<>();

       if(result != null && result.getEntries() != null && result.getEntries().length > 0){
           for(Entry entry: result.getEntries()){
               PublicationDetail publication = transformDatasetSummary(entry);
               if(publication != null)
                   publications.add(publication);
           }
       }
       return publications;

   }

    /**
     * Transform a web-service entry to a PublicationDetail
     * @param entry the original entry from the dataset
     * @return a Dataset Summary
     */
    private static PublicationDetail transformDatasetSummary(Entry entry){

        PublicationDetail publication = null;

        if(entry != null){
            //Set the id of the entry
            publication = new PublicationDetail();

            publication.setId(entry.getId());
            publication.setSource(entry.getSource());

            if(entry.getFields() != null){
                if(entry.getFields().containsKey(Constants.PUBMED_NAME_FIELD))
                    if(entry.getFields().get(Constants.PUBMED_NAME_FIELD) != null && entry.getFields().get(Constants.PUBMED_NAME_FIELD).length > 0)
                        publication.setTitle(entry.getFields().get(Constants.PUBMED_NAME_FIELD)[0]);

                if(entry.getFields().containsKey(Constants.PUBMED_ABSTRACT_FIELD))
                    if(entry.getFields().get(Constants.PUBMED_ABSTRACT_FIELD) != null && entry.getFields().get(Constants.PUBMED_ABSTRACT_FIELD).length > 0)
                        publication.setPubAbstract(entry.getFields().get(Constants.PUBMED_ABSTRACT_FIELD));

                if(entry.getFields().containsKey(Constants.PUBMED_DATE_FIELD))
                    if(entry.getFields().get(Constants.PUBMED_DATE_FIELD) != null && entry.getFields().get(Constants.PUBMED_DATE_FIELD).length > 0)
                        publication.setDate(entry.getFields().get(Constants.PUBMED_DATE_FIELD)[0]);

                if(entry.getFields().containsKey(Constants.PUBMED_KEYS_FIELD))
                    if(entry.getFields().get(Constants.PUBMED_KEYS_FIELD) != null && entry.getFields().get(Constants.PUBMED_KEYS_FIELD).length > 0)
                        publication.setKeywords(entry.getFields().get(Constants.PUBMED_KEYS_FIELD));

                if(entry.getFields().containsKey(Constants.PUBMED_AUTHOR_FIELD))
                    if(entry.getFields().get(Constants.PUBMED_AUTHOR_FIELD) != null && entry.getFields().get(Constants.PUBMED_AUTHOR_FIELD).length > 0)
                        publication.setAuthors(entry.getFields().get(Constants.PUBMED_AUTHOR_FIELD));

                if(entry.getFields().containsKey(Constants.PUBMED_JOURNAL_FIELD))
                    if(entry.getFields().get(Constants.PUBMED_JOURNAL_FIELD) != null && entry.getFields().get(Constants.PUBMED_JOURNAL_FIELD).length > 0)
                        publication.setJournal(entry.getFields().get(Constants.PUBMED_JOURNAL_FIELD)[0]);

                if(entry.getFields().containsKey(Constants.PUBMED_ISSUE_FIELD))
                    if(entry.getFields().get(Constants.PUBMED_ISSUE_FIELD) != null && entry.getFields().get(Constants.PUBMED_ISSUE_FIELD).length > 0)
                        publication.setIssue(entry.getFields().get(Constants.PUBMED_ISSUE_FIELD)[0]);

                if(entry.getFields().containsKey(Constants.PUBMED_PAG_FIELD))
                    if(entry.getFields().get(Constants.PUBMED_PAG_FIELD) != null && entry.getFields().get(Constants.PUBMED_PAG_FIELD).length > 0)
                        publication.setPagination(entry.getFields().get(Constants.PUBMED_PAG_FIELD)[0]);


                if(entry.getFields().containsKey(Constants.PUBMED_VOL_FIELD))
                    if(entry.getFields().get(Constants.PUBMED_VOL_FIELD) != null && entry.getFields().get(Constants.PUBMED_VOL_FIELD).length > 0)
                        publication.setVolume(entry.getFields().get(Constants.PUBMED_VOL_FIELD)[0]);

                if(entry.getFields().containsKey(Constants.PUBMED_AFFILATION_FIELD))
                    if(entry.getFields().get(Constants.PUBMED_AFFILATION_FIELD) != null && entry.getFields().get(Constants.PUBMED_AFFILATION_FIELD).length > 0)
                        publication.setAffiliation(entry.getFields().get(Constants.PUBMED_AFFILATION_FIELD));


            }
        }
        return publication;
    }

}
