package uk.ac.ebi.ddi.ws.modules.stats.model;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Yasset Perez-Riverol ypriverol
 */
public class DomainStats {

    StatRecord domain = null;

    List<DomainStats> subdomains = new ArrayList<>();

    public DomainStats(){

    }
    public DomainStats(StatRecord domain, List<DomainStats> subdomains) {
        this.domain = domain;
        this.subdomains = subdomains;
    }

    public StatRecord getdomain() {
        return domain;
    }

    public void setdomain(StatRecord domain) {
        this.domain = domain;
    }

    public List<DomainStats> getSubdomains() {
        return subdomains;
    }

    public void setSubdomains(List<DomainStats> subdomains) {
        this.subdomains = subdomains;
    }
}
