package org.omicsdi.springmvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by goucong on 18.10.16.
 */
@Controller
@RequestMapping("/")
public class SearchController {
    @RequestMapping(value = "search",params="q=*:*", method = RequestMethod.GET)
    public String getSearchPage() {
        return "browse";
    }
}
