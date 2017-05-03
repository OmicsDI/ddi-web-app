package uk.ac.ebi.ddi.ws.modules.welcome.controller;

import com.mangofactory.swagger.annotations.ApiIgnore;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 * @author Yasset Perez-Riverol <yperez@ebi.ac.uk>
 *
 */
@Controller
@ApiIgnore
@RequestMapping(value = {"", "/"})
public class WelcomeController {

    @ApiIgnore
    @RequestMapping(method= RequestMethod.GET)
    protected String gotoIndex() throws Exception {
        return "forward:/index.html";
    }


}
