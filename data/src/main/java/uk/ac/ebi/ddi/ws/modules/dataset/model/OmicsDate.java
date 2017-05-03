package uk.ac.ebi.ddi.ws.modules.dataset.model;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by yperez on 10/07/2016.
 */
@XmlRootElement(name ="date")
@XmlAccessorType(XmlAccessType.FIELD)
public class OmicsDate {

    String type;

    String value;

    public OmicsDate(){}

    public OmicsDate(String key, String value) {
        this.type = key;
        this.value = value;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
