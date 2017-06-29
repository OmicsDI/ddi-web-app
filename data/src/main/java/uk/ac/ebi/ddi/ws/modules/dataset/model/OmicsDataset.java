package uk.ac.ebi.ddi.ws.modules.dataset.model;

import uk.ac.ebi.ddi.service.db.model.dataset.Dataset;

import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.*;

/**
 * Created by yperez on 09/07/2016.
 */

@XmlRootElement(name = "omicsdataset")
public class OmicsDataset implements Serializable {


    String accession;

    String database;

    String name;

    String description;

    private List<OmicsDate> dates;

    private ArrayList<Additional> additionals;

    private ArrayList<Ref> crossReferences;

    private boolean isClaimable;

    public OmicsDataset(){}

    public OmicsDataset(Dataset dataset) {
        this.accession = dataset.getAccession();
        this.name = dataset.getName();
        this.database = dataset.getDatabase();
        this.description = dataset.getDescription();
        this.dates = new ArrayList<OmicsDate>(convert(dataset.getDates()));
        this.additionals = new ArrayList<Additional>(convertAdditional(dataset.getAdditional()));
        this.crossReferences = new ArrayList<>(convertRef(dataset.getCrossReferences()));
        this.isClaimable = dataset.isClaimed();


    }

    private ArrayList<Ref> convertRef(Map<String, Set<String>> crossReferences) {
        ArrayList<Ref> value = new ArrayList<>();
        for(Map.Entry entry: crossReferences.entrySet()){
            String key = (String) entry.getKey();
            for(String values: (Set<String>) entry.getValue())
                value.add(new Ref(key, values));
        }
        return value;
    }

    private ArrayList<Additional> convertAdditional(Map<String, Set<String>> crossReferences) {
            ArrayList<Additional> value = new ArrayList<>();
            for(Map.Entry entry: crossReferences.entrySet()){
                String key = (String) entry.getKey();
                for(String values: (Set<String>) entry.getValue())
                    value.add(new Additional(key, values));
            }
        return value;
        }

    private ArrayList<OmicsDate> convert(Map<String, Set<String>> oldValues) {
        ArrayList<OmicsDate> value = new ArrayList<>();
        for(Map.Entry entry: oldValues.entrySet()){
            String key = (String) entry.getKey();
            for(String values: (Set<String>) entry.getValue())
                value.add(new OmicsDate(key, values));
        }
        return  value;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<OmicsDate> getDates() {
        return dates;
    }

    public void setDates(List<OmicsDate> dates) {
        this.dates = dates;
    }

    public ArrayList<Additional> getAdditionals() {
        return additionals;
    }

    public void setAdditionals(ArrayList<Additional> additionals) {
        this.additionals = additionals;
    }

    public ArrayList<Ref> getCrossReferences() {
        return crossReferences;
    }

    public void setCrossReferences(ArrayList<Ref> crossReferences) {
        this.crossReferences = crossReferences;
    }

    public boolean isClaimable() {
        return isClaimable;
    }

    public void setClaimable(boolean claimable) {
        isClaimable = claimable;
    }
}
