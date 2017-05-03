package uk.ac.ebi.ddi.ws.modules.dataset.model;

import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

/**
 * The lab members are the the people that submit the data but also the Head of the lab
 * For some cases like proteomeXchange the lab head can be also added to the datasets and
 * it would be interesting to see them.
 *
 * @author Yasset Perez-Riverol (ypriverol@gmail.com)
 * @date 01/06/2015
 */
@XmlRootElement(name = "labmember")
public class LabMember implements Serializable{

    private static final long serialVersionUID = 1L;

    /**
     * Name of the member of the lab
     */
    String name  = null;

    /**
     * For some reasons it would be interesting to keep track of the
     * type of the users we are showing.
     */
    Role role    = null;

    /**
     * Affiliation of the user
     */
    String Affiliation = null;

    /**
     * Email of the user
     */
    String email = null;

    public LabMember(){}

    public LabMember(String name, Role role, String affiliation, String email) {
        this.name = name;
        this.role = role;
        Affiliation = affiliation;
        this.email = email;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getAffiliation() {
        return Affiliation;
    }

    public void setAffiliation(String affiliation) {
        Affiliation = affiliation;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
