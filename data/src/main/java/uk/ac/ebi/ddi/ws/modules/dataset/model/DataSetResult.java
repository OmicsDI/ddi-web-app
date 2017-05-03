package uk.ac.ebi.ddi.ws.modules.dataset.model;

import uk.ac.ebi.ddi.ebe.ws.dao.model.common.Facet;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Yasset Perez-Riverol ypriverol
 */
public class DataSetResult {

    /**
     * Number of datasets
     */
    Integer count = null;

    /**
     * List of the datasets for the query
     */
    List<DatasetSummary> datasets = new ArrayList<>();

    /**
     * List of the facets for the query
     */
    List<Facet>          facets   = new ArrayList<>();

    /**
     * Default constructor without paramters
     */
    public DataSetResult(){

    }

    /**
     * Default constructor using the parameter, the set of datasets and the facets
     * @param datasets the datasets that futfill the query
     * @param facets   the list of facets
     * @param count    number of datasets
     */
    public DataSetResult(Integer count, List<DatasetSummary> datasets, List<Facet> facets) {
        this.count = count;
        this.datasets = datasets;
        this.facets = facets;
    }




    public List<DatasetSummary> getDatasets() {
        return datasets;
    }

    public void setDatasets(List<DatasetSummary> datasets) {
        this.datasets = datasets;
    }

    public List<Facet> getFacets() {
        return facets;
    }

    public void setFacets(List<Facet> facets) {
        this.facets = facets;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
}
