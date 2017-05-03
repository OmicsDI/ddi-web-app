package uk.ac.ebi.ddi.ws.modules.dataset.model;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * This class represent an specie or organism in TAXONOMY.
 *
 * @author Yasset Perez-Riverol ypriverol
 */
@XmlRootElement(name = "organism")
public class Organism{

    /**
     * Accession of the Specie for example in the TAXONOMY database
     */
    String acc = null;

    /**
     * Name of the taxonomy of specie
     */
    String name = null;

    public Organism(){}

    public Organism(String acc, String name) {
        this.acc = acc;
        this.name = name;
    }

    public String getAcc() {
        return acc;
    }

    public void setAcc(String acc) {
        this.acc = acc;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
