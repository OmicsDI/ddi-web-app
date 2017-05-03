package uk.ac.ebi.ddi.ws.modules.dataset.model;

/**
 * Created by yperez on 10/07/2016.
 */

import javax.xml.bind.annotation.XmlAttribute;

public class MyEntry {

    @XmlAttribute
    public String key;

    @XmlAttribute
    public String value;
}
