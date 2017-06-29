package uk.ac.ebi.ddi.ws.modules.dataset.model;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.*;

/**
 * This is the Detailed dataset entry for all the omics experiments. Using the current ws data model we fill the information of
 * this DatasetDetail to be use by the clients.
 *
 * @author ypriverol
 */

@XmlRootElement(name = "dataset")
public class DatasetDetail implements Serializable{

    private static final long serialVersionUID = 1L;


    /**
     * Id of an Entry
     */
    String id = null;

    /**
     * Source for the entry
     */
    String source = null;

    /**
     * Name of the entry
     */
    String name = null;

    /**
     * Publication date of the dataset
     */
    String description = null;

    /**
     * List of keywords or tags associated with the dataset.
     */
    String[] keywords = null;

    /*
     * List of species for this datset, can be one or more than one specie.
     */
    List<Organism> organisms;

    /**
     * Publication date
     */
    String publicationDate = null;

    /*
     * List of Publications for this dataset, can be one or more than one publications
     */
    List<String> publicationIds;

    /*
     * Data Protocol of the dataset
     */
    List<Protocol> protocols = null;

    /**
     * List of instruments related with the experiment
     */
    List<String> instruments    = null;

    /**
     * Keywords related wit the type of the experiment, this keywords are
     * assigned by the DDI system
     *
     */

    List<String> experimentType = null;
    /**
     * Lab members are those people related with the dataset
     * it can be the submitter, the head of the lab or even the
     * collaborators using the Paper information.
     */

    List<LabMember> labMembers = null;

    /**
     * The full dataset link is the original home of the dataset in the repository
     * as provided by the repositories.
     */
    String full_dataset_link   = null;

    /**
     * Tissues related with the submisssion
     */
    List<String> tissues       = null;

    /**
     * The diseases related with the submission
     */
    List<String> diseases      = null;

    /*
     *added omics type to webservice
     */
    List<String> omics_type    = null;

    // Dataset Similars from annotation system.
    List<DatasetSimilar> similars    = null;

    List<String> organization = null;

    Map<String, Set<String>> dates = null;

    Set<String> submitter = null;

    Set<String> submitterMail = null;

    Set<String> labHead = null;

    Set<String> labHeadMail = null;

    Boolean isClaimable;

    public Boolean getClaimable() {
        return isClaimable;
    }

    public void setClaimable(Boolean claimable) {
        isClaimable = claimable;
    }

    public Set<String> getLabHead() {
        return labHead;
    }

    public void setLabHead(Set<String> labHead) {
        this.labHead = labHead;
    }

    public Set<String> getLabHeadMail() {
        return labHeadMail;
    }

    public void setLabHeadMail(Set<String> labHeadMail) {
        this.labHeadMail = labHeadMail;
    }

    public Set<String> getSubmitter() {
        return submitter;
    }

    public void setSubmitter(Set<String> submitter) {
        this.submitter = submitter;
    }

    public Set<String> getSubmitterMail() {
        return submitterMail;
    }

    public void setSubmitterMail(Set<String> submitterMail) {
        this.submitterMail = submitterMail;
    }
    public List<String> getOrganization() {
        return organization;
    }

    public void setOrganization(List<String> organization) {
        this.organization = organization;
    }

    public List<String> getOmics_type() {
        return omics_type;
    }

    public void setOmics_type(List<String> omics_type) {
        this.omics_type = omics_type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String[] getKeywords() {
        return keywords;
    }

    public void setKeywords(String[] keywords) {
        this.keywords = keywords;
    }

    public void setKeywords(String[] submitterKeys, String[] curatorKeys){
        List<String> tmpkeywords = new ArrayList<>();
        if(submitterKeys != null && submitterKeys.length > 0)
                tmpkeywords.addAll(Arrays.asList(submitterKeys));

        if(curatorKeys != null && curatorKeys.length > 0)
                tmpkeywords.addAll(Arrays.asList(curatorKeys));

        if(tmpkeywords.size() > 0){
            String[] arrayKeywords = new String[tmpkeywords.size()];
            for(int i = 0; i < tmpkeywords.size(); i++)
                arrayKeywords[i] = tmpkeywords.get(i);
            setKeywords(arrayKeywords);
        }
    }

    @XmlElement
    public String getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(String publicationDate) {
        this.publicationDate = publicationDate;
    }

    public void setPublications(List<String> publications) {
        this.publicationIds = publications;
    }

    public void setArrayPublicationIds(String[] ids){
        if(ids != null && ids.length> 0){
            publicationIds = new ArrayList<>();
            for(String id: ids)
                if(id != null && id.length() > 0)
                    publicationIds.add(id);
        }
    }

    @XmlElement
    public List<String> getPublicationIds() {
        return publicationIds;
    }

    @XmlElement
    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    @XmlElement
    public List<Organism> getOrganisms() {
        return organisms;
    }

    public void setOrganisms(List<Organism> organisms) {
        this.organisms = organisms;
    }

    @XmlElement
    public List<Protocol> getProtocols() {
        return protocols;
    }

    public void setProtocols(List<Protocol> protocols) {
        this.protocols = protocols;
    }

    @XmlElement
    public List<LabMember> getLabMembers() {
        return labMembers;
    }

    public void setLabMembers(List<LabMember> labMembers) {
        this.labMembers = labMembers;
    }

    @XmlElement
    public String getFull_dataset_link() {
        return full_dataset_link;
    }

    public void setFull_dataset_link(String full_dataset_link) {
        this.full_dataset_link = full_dataset_link;
    }

    @XmlElement
    public List<String> getInstruments() {
        return instruments;
    }

    public void setInstruments(List<String> instruments) {
        this.instruments = instruments;
    }

    @XmlElement
    public List<String> getExperimentType() {
        return experimentType;
    }

    public void setExperimentType(List<String> experimentType) {
        this.experimentType = experimentType;
    }

    /**
     * Add multiple protocols with the same name but different descriptions.
     * @param protocolField the protocol Name
     * @param protocol_descriptions the Protocol descriptions
     */
    public void addProtocols(String protocolField, String[] protocol_descriptions) {
        if(protocols == null)
            protocols = new ArrayList<>();
        if(protocol_descriptions != null && protocol_descriptions.length > 0 && protocolField != null){
            for(String protocol: protocol_descriptions){
                if(protocol != null && protocol.length() > 0){
                    protocols.add(new Protocol(protocolField, protocol));
                }
            }
        }
    }

    /**
     * Set a list of instrument types from an array of elements
     * @param instruments An array of Instruments.
     */
    public void setArrayInstruments(String[] instruments) {
         if(instruments != null && instruments.length > 0){
             this.instruments = new ArrayList<>();
             for(String instrument: instruments){
                if(instrument != null && instrument.length() >0)
                    this.instruments.add(instrument);
            }
        }
    }

    /**
     * Set the list of experiment types from an Array of elements
     * @param experimentTypes An array of Experiment type terms like Mass Spectrometry, etc
     */
    public void setArrayExperimentType(String[] experimentTypes) {
        if(experimentTypes != null && experimentTypes.length > 0){
            this.experimentType = new ArrayList<>();
            for(String experimentType: experimentTypes){
                if(experimentType != null && experimentType.length() > 0)
                    this.experimentType.add(experimentType);
            }
        }
    }

    @XmlElement
    public List<String> getTissues() {
        return tissues;
    }

    public void setTissues(String[] tissues) {
        if(tissues != null && tissues.length >0){
            this.tissues = new ArrayList<>();
            for(String tissue: tissues)
                if(tissue != null && tissue.length() > 0)
                    this.tissues.add(tissue);

        }
    }

    @XmlElement
    public List<String> getDiseases() {
        return diseases;
    }

    public void setDiseases(String[] diseases) {
        if(diseases != null && diseases.length >0){
            this.diseases = new ArrayList<>();
            for(String disease: diseases)
                if(disease != null && disease.length() > 0)
                    this.diseases.add(disease);

        }
    }

    @XmlElement
    public List<DatasetSimilar> getSimilars() {
        return similars;
    }

    public void setSimilars(List<DatasetSimilar> similars) {
        this.similars = similars;
    }

    public void addSimilar(String accession, String database, String relationType){
        if(similars == null)
            similars = new ArrayList<>();
        similars.add(new DatasetSimilar(accession, database, relationType));
    }

    public Map<String, Set<String>> getDates() {
        return dates;
    }

    public void setDates(Map<String, Set<String>> dates) {
        this.dates = dates;
    }

}
