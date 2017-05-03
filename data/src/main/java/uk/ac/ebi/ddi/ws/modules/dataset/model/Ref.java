package uk.ac.ebi.ddi.ws.modules.dataset.model;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by yperez on 10/07/2016.
 */
@XmlRootElement(name = "ref")
@XmlAccessorType(XmlAccessType.FIELD)
public class Ref {

    String dbName;

    String dbKey;

    public Ref(){}

    public Ref(String dbName, String dbKey) {
        this.dbName = dbName;
        this.dbKey = dbKey;
    }

    public String getDbName() {
        return dbName;
    }

    public void setDbName(String dbName) {
        this.dbName = dbName;
    }

    public String getDbKey() {
        return dbKey;
    }

    public void setDbKey(String dbKey) {
        this.dbKey = dbKey;
    }
}
