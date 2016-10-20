package org.omicsdi.springmvc.controller;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
<<<<<<< HEAD

import javax.servlet.http.HttpServletRequest;

=======
import javax.servlet.http.HttpServletRequest;
>>>>>>> 8f645e949864ba8f54ee79a0c504e493e8d43fc6
/**
 * Created by goucong on 18.10.16.
 */
@Controller
@RequestMapping("/")
public class SearchController {
<<<<<<< HEAD

=======
>>>>>>> 8f645e949864ba8f54ee79a0c504e493e8d43fc6
    @RequestMapping(value = "search",method = RequestMethod.GET)
    public String getSearchPage( Model model,HttpServletRequest request) {
        String query = String.valueOf(request.getParameter("q"));
        System.out.println(query);
<<<<<<< HEAD
        model.addAttribute("keyword",query);
        return "browse";
    }

}
=======
        model.addAttribute("q",query);
        return "browse";
    }
}
>>>>>>> 8f645e949864ba8f54ee79a0c504e493e8d43fc6
