package uk.ac.ebi.ddi.ws.modules.dataset.model;

import javax.xml.bind.annotation.adapters.XmlAdapter;
import java.util.ArrayList;
import java.util.Map;

/**
 * Created by yperez on 10/07/2016.
 */

public class MapDatesAdapter extends XmlAdapter <MyMap, Map<String, String>> {

    @Override
    public Map<String, String> unmarshal(MyMap value) throws Exception {
        throw new UnsupportedOperationException();
    }

    @Override
    public MyMap marshal(Map<String, String> value) throws Exception {
        MyMap map = new MyMap();

        map.entries = new ArrayList<>();
        for (String key : value.keySet()) {
            MyEntry entry = new MyEntry();
            entry.key = key;
            entry.value = value.get(key);
            map.entries.add(entry);
        }
        return map;
    }

}




