package org.omicsdi.springmvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by goucong on 18.10.16.
 */
@Controller
@RequestMapping("/")
public class SearchController {

    @RequestMapping(value = "search",method = RequestMethod.GET)
    public String getSearchPage( Model model,HttpServletRequest request) {
        String query = String.valueOf(request.getParameter("q"));
        System.out.println(query);
        model.addAttribute("keyword",query);
        return "browse";
    }

}
