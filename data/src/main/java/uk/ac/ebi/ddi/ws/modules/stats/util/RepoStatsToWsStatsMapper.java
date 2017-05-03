package uk.ac.ebi.ddi.ws.modules.stats.util;

import uk.ac.ebi.ddi.ebe.ws.dao.model.common.IndexInfo;
import uk.ac.ebi.ddi.ebe.ws.dao.model.domain.Domain;
import uk.ac.ebi.ddi.ebe.ws.dao.model.domain.DomainList;
import uk.ac.ebi.ddi.ebe.ws.dao.model.common.Facet;
import uk.ac.ebi.ddi.ebe.ws.dao.model.facet.FacetList;
import uk.ac.ebi.ddi.ebe.ws.dao.model.common.FacetValue;
import uk.ac.ebi.ddi.ws.modules.stats.model.DomainStats;
import uk.ac.ebi.ddi.ws.modules.stats.model.StatRecord;
import uk.ac.ebi.ddi.ws.util.Constants;


import java.util.ArrayList;
import java.util.List;

/**
 * Mapper class maps the statistics from repo level to the web service level
 *
 * @author Yasset Perez-Riverol ypriverol@gmail.com
 */
public final class RepoStatsToWsStatsMapper {

    /**
     * Convert the Domain statistics List
     * @param domainList Domain List it can be seen as a repository each domain
     * @return List<DomainStats> Domain statistics
     */
    public static List<DomainStats> asDomainStatsList(DomainList domainList) {

        List<DomainStats> domains = new ArrayList<>();

        if(domainList != null && domainList.list != null && domainList.list.length > 0){
            for(Domain domain: domainList.list){
                domains.add(domainStats(domain));
            }
        }
        return domains;
    }

    /**
     * Domain statistics conversion
     * @param domain
     * @return
     */
    public static DomainStats domainStats(Domain domain){
        DomainStats domainStasts = null;
        if(domain != null){
            domainStasts = new DomainStats();
            StatRecord record = new StatRecord(domain.getName(), null, null);
            if(domain.getIndexInfo() != null && domain.getIndexInfo().length > 0){
                for(IndexInfo info: domain.getIndexInfo()){
                    if(info != null && info.getName().equalsIgnoreCase(Constants.ENTRY_COUNT)){
                        record.setValue(info.getValue());
                        break;
                    }
                }
            }
            domainStasts.setdomain(record);
            if(domain.getSubDomains() != null && domain.getSubDomains().length >0){
                List<DomainStats> subdomains = new ArrayList<>();
                for(Domain subDomain: domain.getSubDomains())
                    subdomains.add(domainStats(subDomain));
                domainStasts.setSubdomains(subdomains);
            }
        }
        return domainStasts;
    }

    /**
     * Return General statistics about the Datasets, the number of entries, the number of different manuscripts, etc
     * @param domain
     * @return
     */
    public static List<StatRecord> asGeneralStatsList(DomainList domain) {
        List<StatRecord> general = new ArrayList<>();
        List<DomainStats> domainStatses = asDomainStatsList(domain);
        int count = 0;
        for(DomainStats domainStats: domainStatses)
        general.add(new StatRecord(Constants.REPOSITORY_TAG, String.valueOf(count), null));
        return general;

    }

    /**
     * Retirve the facet count for every field
     * @param facets The facets values
     * @param field The field
     * @return The list of stats by Field type
     */
    public static List<StatRecord> asFacetCount(FacetList facets, String field) {
        List<StatRecord> records = new ArrayList<>();

        if(facets != null && facets.getFacets().length != 0){
            records.add(new StatRecord("Total", facets.getHitCount(), null));
            StatRecord unknowRecord = new StatRecord(Constants.NOT_AVAILABLE, "0", null);
            int countNotAvailable = 0;
            for(Facet facet: facets.getFacets()){
                if(facet.getId().equalsIgnoreCase(field)){
                    for(FacetValue facetValue: facet.getFacetValues()){
                        if(facetValue.getLabel().equalsIgnoreCase(Constants.NOT_AVAILABLE) || facetValue.getLabel().contains(Constants.NOT_APPLICABLE)){
                            countNotAvailable = countNotAvailable + Integer.parseInt(facetValue.getCount());
                        }else{
                            records.add(new StatRecord(facetValue.getLabel(), facetValue.getCount(), facetValue.getValue()));
                        }

                    }
                }
            }
            unknowRecord.setValue(String.valueOf(countNotAvailable));
            records.add(unknowRecord);
        }
        return records;
    }

}
