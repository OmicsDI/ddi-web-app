package uk.ac.ebi.ddi.security.controller;
import org.springframework.web.bind.annotation.*;
import uk.ac.ebi.ddi.security.model.KeyValuePair;

import java.util.ArrayList;

/**
 * Created by user on 5/18/2017.
 */
@RestController
public class OntologyController {
    @RequestMapping(value = "/api/ontology/ontologyLookup", method = RequestMethod.GET)
    @CrossOrigin
    KeyValuePair[] ontologyLookup(@RequestParam("key") String[] keys){
        ArrayList<KeyValuePair> result = new ArrayList<KeyValuePair>();
        for(String s: keys){
            result.add(new KeyValuePair(s,"The "+s));
        }
        return result.toArray(new KeyValuePair[0]);
    }
}
