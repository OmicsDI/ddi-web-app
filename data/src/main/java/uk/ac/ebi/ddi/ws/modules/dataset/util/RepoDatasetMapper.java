package uk.ac.ebi.ddi.ws.modules.dataset.util;

import uk.ac.ebi.ddi.ebe.ws.dao.model.common.Entry;
import uk.ac.ebi.ddi.ebe.ws.dao.model.common.QueryResult;
import uk.ac.ebi.ddi.ebe.ws.dao.model.dataset.TermResult;
import uk.ac.ebi.ddi.ws.modules.dataset.model.*;
import uk.ac.ebi.ddi.ws.modules.term.model.Term;
import uk.ac.ebi.ddi.ws.util.Constants;


import java.util.*;
import java.util.regex.Pattern;

/**
 * @author Yasset Perez-Riverol ypriverol
 */

@SuppressWarnings("ManualArrayToCollectionCopy")
public class RepoDatasetMapper {

    /**
     * Transform the information form the query to the Web service strucutre
     * @param queryResults The original results from the Query
     * @return             The set of datasets form the query
     */
    public static DataSetResult asDataSummary(QueryResult queryResults, QueryResult taxonomies){

        Map<String, String> taxonomyMap = RepoDatasetMapper.getTaxonomyMap(taxonomies);

        DataSetResult dataset = new DataSetResult();

        List<DatasetSummary> datasets = new ArrayList<>();

        dataset.setCount(queryResults.getCount());

        if(queryResults.getFacets() != null && queryResults.getFacets().length > 0)
            dataset.setFacets(Arrays.asList(queryResults.getFacets()));

        if(queryResults.getEntries() != null && queryResults.getEntries().length > 0){
          for(Entry entry: queryResults.getEntries())
              datasets.add(RepoDatasetMapper.transformDatasetSummary(entry, taxonomyMap));
        }
        dataset.setDatasets(datasets);

        return dataset;
    }

    /**
     * Retrieve the information of each taxonomy as id + name
     * @param taxonomies A list of taxonomies
     * @return The map of the taxonomies as Map<id, name>
     */
    private static Map<String, String> getTaxonomyMap(QueryResult taxonomies) {
        Map<String, String> taxonomyMap  = new HashMap<>();

        if(taxonomies != null && taxonomies.getEntries() != null && taxonomies.getEntries().length > 0){
            for(Entry entry: taxonomies.getEntries()){
                if(entry != null && entry.getFields() != null && entry.getFields().containsKey(Constants.TAXONOMY_NAME)
                        && entry.getFields().get(Constants.TAXONOMY_NAME).length > 0 && entry.getFields().get(Constants.TAXONOMY_NAME)[0] != null){
                    taxonomyMap.put(entry.getId(), entry.getFields().get(Constants.TAXONOMY_NAME)[0]);
                }
            }
        }
        return taxonomyMap;
    }

    /**
     * Transform a web-service entry to a DatasetSummary
     * @param entry the original entry from the dataset
     * @param taxonomyMap The map of all taxonomies included in this query
     * @return a Dataset Summary
     */
    private static DatasetSummary transformDatasetSummary(Entry entry, Map<String, String> taxonomyMap){

        DatasetSummary datasetSummary = new DatasetSummary();

        if(entry != null){
            /**
             * Set the id of the entry
             */
            datasetSummary.setId(entry.getId());

            datasetSummary.setSource(entry.getSource());

            if(entry.getFields() != null){
                if(entry.getFields().containsKey(Constants.NAME_FIELD))
                    if(entry.getFields().get(Constants.NAME_FIELD) != null && entry.getFields().get(Constants.NAME_FIELD).length > 0)
                        datasetSummary.setTitle(entry.getFields().get(Constants.NAME_FIELD)[0]);

                if(entry.getFields().containsKey(Constants.DESCRIPTION_FIELD))
                    if(entry.getFields().get(Constants.DESCRIPTION_FIELD) != null && entry.getFields().get(Constants.DESCRIPTION_FIELD).length > 0)
                        datasetSummary.setDescription(entry.getFields().get(Constants.DESCRIPTION_FIELD)[0]);

                if(entry.getFields().containsKey(Constants.PUB_DATE_FIELD))
                    if(entry.getFields().get(Constants.PUB_DATE_FIELD) != null && entry.getFields().get(Constants.PUB_DATE_FIELD).length > 0)
                        datasetSummary.setPublicationDate(entry.getFields().get(Constants.PUB_DATE_FIELD)[0]);

                List<String> keywords = new ArrayList<>();

                if(entry.getFields().containsKey(Constants.CURATOR_KEY_FIELD))
                    if(entry.getFields().get(Constants.CURATOR_KEY_FIELD) != null && entry.getFields().get(Constants.CURATOR_KEY_FIELD).length > 0)
                        keywords.addAll(formatKeywords(Arrays.asList(entry.getFields().get(Constants.CURATOR_KEY_FIELD))));

                if(entry.getFields().containsKey(Constants.OMICS_TYPE_FIELD))
                    if(entry.getFields().get(Constants.OMICS_TYPE_FIELD) != null && entry.getFields().get(Constants.OMICS_TYPE_FIELD).length > 0)
                        datasetSummary.setOmicsType(Arrays.asList(entry.getFields().get(Constants.OMICS_TYPE_FIELD)));


                if(entry.getFields().containsKey(Constants.SUBMITTER_KEY_FIELD))
                    if(entry.getFields().get(Constants.SUBMITTER_KEY_FIELD) != null && entry.getFields().get(Constants.SUBMITTER_KEY_FIELD).length > 0)
                        keywords.addAll(formatKeywords(Arrays.asList(entry.getFields().get(Constants.SUBMITTER_KEY_FIELD))));

                if(keywords.size() > 0){
                    String[] arrayKeywords = new String[keywords.size()];
                    for(int i = 0; i < keywords.size(); i++)
                        arrayKeywords[i] = keywords.get(i);
                    datasetSummary.setKeywords(arrayKeywords);
                }

                List<Organism> organisms = new ArrayList<>();

                if(entry.getFields().containsKey(Constants.TAXONOMY_FIELD)){
                    if(entry.getFields().get(Constants.TAXONOMY_FIELD) != null && entry.getFields().get(Constants.TAXONOMY_FIELD).length > 0){
                        for(String taxonomyId: entry.getFields().get(Constants.TAXONOMY_FIELD)){
                            organisms.add(new Organism(taxonomyId, taxonomyMap.get(taxonomyId)));
                        }
                    }
                }
                datasetSummary.setOrganisms(organisms);
            }
        }
        return datasetSummary;
    }

    private static Collection<? extends String> formatKeywords(List<String> strings) {
        List<String> newKeywords;
        if(strings != null && !strings.isEmpty()){
            newKeywords = new ArrayList<>();
            for(String oldkeyword: strings){
                Pattern pattern = Pattern.compile(";");
                Pattern pattern2 = Pattern.compile("；");
                String[] split = pattern.split(oldkeyword, 0);
                String[] split2 = pattern2.split(oldkeyword, 0);
                if(split.length > 1){
                    for(String newKey: split)
                        newKeywords.add(newKey);
                }else if(split2.length >1){
                    for(String newKey: split2)
                        newKeywords.add(newKey);
                }else{
                    newKeywords.add(oldkeyword);
                }
            }
            strings = newKeywords;
        }
        return strings;
    }

    /**
     * Returns the Terms frequency List
     * @param termResult terms from the web service
     * @return List of terms
     */
    public static List<Term> asTermResults(TermResult termResult) {
        List<Term> terms = new ArrayList<>();
        if(termResult != null && termResult.getTerms() != null && termResult.getTerms().length > 0){
            for(uk.ac.ebi.ddi.ebe.ws.dao.model.common.Term oldTerm: termResult.getTerms())
                terms.add(new Term(oldTerm.getText(), oldTerm.getFrequency()));
        }
        return terms;
    }

    /**
     * Return a set of taxonomy ids from the Dataset List
     * @param queryResult the datasets to be anaylzed
     * @return a list of taxonomy ids
     */
    public static Set<String> getTaxonomyIds(QueryResult queryResult){
        Set<String> ids = new HashSet<>();
        if(queryResult != null && queryResult.getEntries() != null && queryResult.getEntries().length > 0){
            for(Entry entry: queryResult.getEntries()){
               if(entry.getFields() != null && entry.getFields().containsKey(Constants.TAXONOMY_FIELD)){
                   Collections.addAll(ids, entry.getFields().get(Constants.TAXONOMY_FIELD));
               }
            }
        }
        return ids;
    }

    /**
     * Merge a set of queries and retrieve only one query. This function is specially interesting when you have more than the limits of the entries to be query (100).
     * We are not merging the facets now because it is not interesting but in the future we can do it.
     * @param resultList List of QueryResult to be merge
     * @return One big QueryResult
     */
    public static QueryResult mergeQueryResult(List<QueryResult> resultList) {
        QueryResult result = new QueryResult();

        List<Entry> entries = new ArrayList<>();

        for(QueryResult query: resultList)
            entries.addAll(Arrays.asList(query.getEntries()));

        Entry[] entryArray = new Entry[entries.size()];

        for(int i=0; i < entries.size(); i++)
           entryArray[i] = entries.get(i);

        result.setEntries(entryArray);

        result.setCount(entryArray.length);

        return result;
    }

    public static DatasetDetail addTaxonomy(DatasetDetail datasetDetail, QueryResult taxonomies) {
        List<Organism> organismList = new ArrayList<>();
        if(taxonomies != null && taxonomies.getEntries() != null && taxonomies.getEntries().length > 0){
            for(Entry entry: taxonomies.getEntries()){
                if(entry != null){
                    String acc = entry.getId();
                    String name = entry.getFields().get(Constants.TAXONOMY_NAME)[0];
                    Organism organism = new Organism(acc, name);
                    organismList.add(organism);
                }
            }
        }
        datasetDetail.setOrganisms(organismList);
        return datasetDetail;
    }
}
