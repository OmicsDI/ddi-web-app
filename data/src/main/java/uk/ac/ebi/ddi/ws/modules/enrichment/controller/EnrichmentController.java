package uk.ac.ebi.ddi.ws.modules.enrichment.controller;

/**
 * Created by mingze on 27/10/15.
 */

import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import uk.ac.ebi.ddi.ebe.ws.dao.client.dataset.DatasetWsClient;
import uk.ac.ebi.ddi.ebe.ws.dao.model.common.QueryResult;
import uk.ac.ebi.ddi.service.db.model.enrichment.DatasetEnrichmentInfo;
import uk.ac.ebi.ddi.service.db.model.enrichment.WordInField;
import uk.ac.ebi.ddi.service.db.model.similarity.DatasetStatInfo;
import uk.ac.ebi.ddi.service.db.model.similarity.IntersectionInfo;
import uk.ac.ebi.ddi.service.db.service.enrichment.IEnrichmentInfoService;
import uk.ac.ebi.ddi.service.db.service.enrichment.ISynonymsService;
import uk.ac.ebi.ddi.service.db.service.similarity.IDatasetStatInfoService;
import uk.ac.ebi.ddi.ws.modules.dataset.model.DataSetResult;
import uk.ac.ebi.ddi.ws.modules.dataset.model.DatasetSummary;
import uk.ac.ebi.ddi.ws.modules.enrichment.model.SimilarInfoResult;
import uk.ac.ebi.ddi.ws.modules.enrichment.model.SynonymsForDataset;
import uk.ac.ebi.ddi.ws.modules.enrichment.model.SynonymsForWord;
import uk.ac.ebi.ddi.ws.util.Constants;
import uk.ac.ebi.ddi.ws.util.Field;
import uk.ac.ebi.ddi.ws.util.Triplet;
import uk.ac.ebi.ddi.ws.util.WsUtilities;

import java.util.*;

@Api(value = "enrichment", description = "Retrieve the information about the enrichment and synonyms ", position = 0)
@Controller
@RequestMapping(value = "/enrichment")

public class EnrichmentController {

    private static final Logger logger = LoggerFactory.getLogger(EnrichmentController.class);

    @Autowired
    IEnrichmentInfoService enrichmentService;

    @Autowired
    ISynonymsService wordService;

    @Autowired
    IDatasetStatInfoService datasetStatInfoService;

    @Autowired
    DatasetWsClient dataWsClient;

    @ApiOperation(value = "get enrichment Info", position = 1, notes = "retrieve the enrichment data for a dataset")
    @RequestMapping(value = "/getEnrichmentInfo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK) // 200
    public
    @ResponseBody
    DatasetEnrichmentInfo getEnrichmentInfo(
            @ApiParam(value = "Dataset accession")
            @RequestParam(value = "accession", required = true, defaultValue = "PXD002287") String accession,
            @ApiParam(value = "Database name, e.g: PRIDE")
            @RequestParam(value = "database", required = true, defaultValue = "PRIDE") String database
    ) {
        database = Constants.Database.retriveAnchorName(database);
        DatasetEnrichmentInfo enrichmentInfo = enrichmentService.readByAccession(accession, database);
        return enrichmentInfo;
    }


    @ApiOperation(value = "get synonyms for a dataset", position = 1, notes = "retrieve all synonyms for the words in a dataset")
    @RequestMapping(value = "/getSynonymsForDataset", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK) // 200
    public
    @ResponseBody
    SynonymsForDataset getSynonymsForDataset(
            @ApiParam(value = "Dataset accession")
            @RequestParam(value = "accession", required = true, defaultValue = "PXD002287") String accession,
            @ApiParam(value = "Database name, e.g: PRIDE")
            @RequestParam(value = "database", required = true, defaultValue = "PRIDE") String database
    ) {
        database = Constants.Database.retriveAnchorName(database);
        DatasetEnrichmentInfo enrichmentInfo = enrichmentService.readByAccession(accession, database);
        if (enrichmentInfo == null) {
            return null;
        }
        List<String> words = getEnrichedWordsInDataset(enrichmentInfo);

        SynonymsForDataset synonymsForDataset = new SynonymsForDataset(accession, database);

        for (String word : words) {
            SynonymsForWord synonymsForWord = new SynonymsForWord(word);
            List<String> synonymList = wordService.getAllSynonyms(word);
            synonymsForWord.setSynonyms(synonymList);
            synonymsForDataset.addSynonymsForWordIntoList(synonymsForWord);
        }

        return synonymsForDataset;
    }


    /**
     * Get all enriched words(string) in a dataset, from different fields
     *
     * @param enrichmentInfo
     * @return
     */
    private List<String> getEnrichedWordsInDataset(DatasetEnrichmentInfo enrichmentInfo) {
        Set<String> words = new HashSet<>();
        List<WordInField> wordsInField = new ArrayList<>();
        if(enrichmentInfo.getSynonyms() != null){
            if(enrichmentInfo.getSynonyms().containsKey(Field.NAME.getName()))
                wordsInField.addAll(enrichmentInfo.getSynonyms().get(Field.NAME.getName()));
            if(enrichmentInfo.getSynonyms().containsKey(Field.DESCRIPTION.getName()))
                wordsInField.addAll(enrichmentInfo.getSynonyms().get(Field.DESCRIPTION.getName()));
            if(enrichmentInfo.getSynonyms().containsKey(Field.DATA.getName()))
                wordsInField.addAll(enrichmentInfo.getSynonyms().get(Field.DATA.getName()));
            if(enrichmentInfo.getSynonyms().containsKey(Field.SAMPLE.getName()))
                wordsInField.addAll(enrichmentInfo.getSynonyms().get(Field.SAMPLE.getName()));
            if(enrichmentInfo.getSynonyms().containsKey(Field.PUBMED_TITLE.getName()))
                wordsInField.addAll(enrichmentInfo.getSynonyms().get(Field.PUBMED_TITLE.getName()));
            if(enrichmentInfo.getSynonyms().containsKey(Field.PUBMED_ABSTRACT.getName()))
                wordsInField.addAll(enrichmentInfo.getSynonyms().get(Field.PUBMED_ABSTRACT.getName()));
        }
        //unique
        for (WordInField wordInField : wordsInField)
            words.add(wordInField.getText());

        return new ArrayList<>(words);
    }


    @ApiOperation(value = "get similar datasets for a dataset", position = 1, notes = "retrieve all similar datasets for the dataset")
    @RequestMapping(value = "/getSimilarDatasetsByBiologicalData", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK) // 200
    public
    @ResponseBody
    DataSetResult getSimilarDatasetsByBiologicalData(
            @ApiParam(value = "Dataset accession")
            @RequestParam(value = "accession", required = true, defaultValue = "PXD000002") String accession,
            @ApiParam(value = "Database name, e.g: PRIDE")
            @RequestParam(value = "database", required = true, defaultValue = "PRIDE") String database
    ) {

        String anchorDatabase = Constants.Database.retriveAnchorName(database);
        DataSetResult result = new DataSetResult();
        DatasetStatInfo datasetStatInfo = datasetStatInfoService.readByAccession(accession, anchorDatabase);
        List<IntersectionInfo> intersectionInfos;


        if (datasetStatInfo != null) {
            intersectionInfos = datasetStatInfo.getIntersectionInfos();

            Collections.sort(intersectionInfos, new Comparator<IntersectionInfo>() {
                @Override
                public int compare(IntersectionInfo o1, IntersectionInfo o2) {
                    Double value1 = o1.getCosineScore();
                    Double value2 = o2.getCosineScore();
                    if (value1 < value2) return 1;
                    else if (Objects.equals(value1, value2)) return 0;
                    else return -1;
                }
            });
            int subListLength = 30;
            if (subListLength > intersectionInfos.size()) {
                subListLength = intersectionInfos.size();
            }
            intersectionInfos = intersectionInfos.subList(0, subListLength);

            List<DatasetSummary> datasetSummaryList = getDataFromEBeyeSearch(accession, database, intersectionInfos);
            datasetSummaryList = addScores(datasetSummaryList, intersectionInfos);

            result.setDatasets(datasetSummaryList);
            result.setCount(datasetSummaryList.size());
        }
        return result;
    }

    private List<DatasetSummary> getDataFromEBeyeSearch(String accession, String database, List<IntersectionInfo> intersectionInfos) {

        List<DatasetSummary> datasetSummaryList = new ArrayList<>();
        Map<String, Set<String>> currentIds = new HashMap<>();
        for (IntersectionInfo intersectionInfo : intersectionInfos) {

            if (intersectionInfo.getRelatedDatasetAcc() != null || intersectionInfo.getRelatedDatasetDatabase() != null) {
                String tempDatabaseName = intersectionInfo.getRelatedDatasetDatabase();

                tempDatabaseName = Constants.Database.retriveSorlName(tempDatabaseName);
                Set<String> ids = currentIds.get(tempDatabaseName);

                if (ids == null)
                    ids = new HashSet<>();
                if (!(intersectionInfo.getRelatedDatasetAcc().equalsIgnoreCase(accession) && tempDatabaseName.equalsIgnoreCase(database)))
                    ids.add(intersectionInfo.getRelatedDatasetAcc());
                currentIds.put(tempDatabaseName, ids);
            }

        }

        for (String currentDomain : currentIds.keySet()) {
            Set<String> ids = currentIds.get(currentDomain);

            if(ids.size()<99) {
                QueryResult datasetResult = dataWsClient.getDatasetsById(currentDomain, Constants.DATASET_DETAIL, ids);
                datasetSummaryList.addAll(WsUtilities.transformDatasetSummary(datasetResult, currentDomain, null));
            }
        }

        return datasetSummaryList;
    }

    private List<DatasetSummary> addScores(List<DatasetSummary> datasetSummaryList, List<IntersectionInfo> intersectionInfos) {

        for (DatasetSummary datasetSummary : datasetSummaryList) {
            String accession = datasetSummary.getId();
            String database = datasetSummary.getSource();
            database = Constants.Database.retriveAnchorName(database);
            Double score = 0.0;
            for (IntersectionInfo intersectionInfo : intersectionInfos) {
                if (intersectionInfo.getRelatedDatasetAcc().equals(accession) && intersectionInfo.getRelatedDatasetDatabase().equals(database)) {
                    score = intersectionInfo.getCosineScore();
                    break;
                }
            }
            datasetSummary.setScore(String.valueOf(score));
        }

        Collections.sort(datasetSummaryList, new Comparator<DatasetSummary>() {
            @Override
            public int compare(DatasetSummary o1, DatasetSummary o2) {
                Double value1 = Double.valueOf(o1.getScore());
                Double value2 = Double.valueOf(o2.getScore());
                if (value1 < value2) return 1;
                else if (Objects.equals(value1, value2)) return 0;
                else return -1;
            }
        });

        if (datasetSummaryList.size() > 10) {
            datasetSummaryList = datasetSummaryList.subList(0, 10);
        }

        return datasetSummaryList;
    }

    @ApiOperation(value = "get similarity information for a dataset", position = 1, notes = "retrieve similarity info between the datasets that is similar to the given dataset, filtered by similarity threshold score ")
    @RequestMapping(value = "/getSimilarityInfo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK) // 200
    public
    @ResponseBody
    SimilarInfoResult getSimilarityInfo(
            @ApiParam(value = "Dataset accession")
            @RequestParam(value = "accession", required = true, defaultValue = "PXD000002") String accession,
            @ApiParam(value = "Database name, e.g: PRIDE")
            @RequestParam(value = "database", required = true, defaultValue = "PRIDE") String database,
            @ApiParam(value = "Threshold score, e.g: 0.50")
            @RequestParam(value = "threshold", required = true, defaultValue = "0.50") float threshold
    ) {

        List<String> similarDatasets = new ArrayList<>();
        Set<Triplet> Scores = new HashSet<>();
        String combinedName = accession + "@" + database;
        similarDatasets.add(combinedName);//put itself in the set;

        DatasetStatInfo datasetStatInfo = datasetStatInfoService.readByAccession(accession, Constants.Database.retriveAnchorName(database));
        if (datasetStatInfo != null) {
            List<IntersectionInfo> intersectionInfos = datasetStatInfo.getIntersectionInfos();
            Collections.sort(intersectionInfos, new Comparator<IntersectionInfo>() {
                @Override
                public int compare(IntersectionInfo o1, IntersectionInfo o2) {
                    Double value1 = o1.getCosineScore();
                    Double value2 = o2.getCosineScore();
                    if (value1 < value2) return 1;
                    else if (Objects.equals(value1, value2)) return 0;
                    else return -1;
                }
            });
            int length = intersectionInfos.size();
            for (IntersectionInfo intersectionInfo : intersectionInfos) {
                String combinedName2 = intersectionInfo.getRelatedDatasetAcc() + "@" + intersectionInfo.getRelatedDatasetDatabase();

                if (intersectionInfo.getRelatedDatasetAcc() != null && intersectionInfo.getRelatedDatasetDatabase() != null) {
                    similarDatasets.add(combinedName2);
                    if ((float) intersectionInfo.getCosineScore() >= threshold) {
                        Triplet<String, String, Float> score = new Triplet<>(combinedName, combinedName2, (float) intersectionInfo.getCosineScore());
                        Scores.add(score);
                        findSimilarScoresFor(intersectionInfo.getRelatedDatasetAcc(), intersectionInfo.getRelatedDatasetDatabase(), similarDatasets, Scores, threshold);
                    }
                }
            }
        }
        return new SimilarInfoResult(accession, database, new ArrayList<>(Scores));
    }

    /**
     * This function find the similar scores between this dataset(accession+database) and the other datasets inside the similarDatasets set
     *
     * @param accession
     * @param database
     * @param similarDatasets
     * @param Scores
     */
    private void findSimilarScoresFor(String accession, String database, List<String> similarDatasets, Set<Triplet> Scores, float threshold) {
        String combinedName = accession + "@" + database;
        DatasetStatInfo datasetStatInfo = datasetStatInfoService.readByAccession(accession, database);
        if (datasetStatInfo != null) {
            List<IntersectionInfo> intersectionInfos = datasetStatInfo.getIntersectionInfos();
            int length = intersectionInfos.size();
            for (IntersectionInfo intersectionInfo : intersectionInfos) {
                String combinedName2 = intersectionInfo.getRelatedDatasetAcc() + "@" + intersectionInfo.getRelatedDatasetDatabase();
                if (similarDatasets.contains(combinedName2) && (float) intersectionInfo.getCosineScore() >= threshold) {
                    Triplet<String, String, Float> score = new Triplet<>(combinedName, combinedName2, (float) intersectionInfo.getCosineScore());
                    if (!Scores.contains(score)) {
                        Scores.add(score);
                    }
                }
            }
        }
    }


}
