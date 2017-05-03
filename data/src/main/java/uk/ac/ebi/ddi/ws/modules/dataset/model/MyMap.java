package uk.ac.ebi.ddi.ws.modules.dataset.model;

import javax.xml.bind.annotation.XmlElement;
import java.util.List;

/**
 * Created by yperez on 10/07/2016.
 */
public class MyMap {
    @XmlElement(name="entry")
    public List<MyEntry> entries;
}