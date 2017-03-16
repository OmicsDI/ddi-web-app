package uk.ac.ebi.ddi.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by user on 3/16/2017.
 */
@RestController
public class HomeController {
    @RequestMapping(value = "/rest/hello", method = RequestMethod.GET)
    public String getCurrent() {
        return "hello rest";
    }
}
