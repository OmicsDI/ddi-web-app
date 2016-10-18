package org.omicsdi.springmvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/")
public class IndexController {

    //return the corresponding jsp page
	@RequestMapping(value = "/",method = RequestMethod.GET)
	public String getIndexPage(ModelMap model) {
		return "index";
	}

	@RequestMapping(value = "about", method = RequestMethod.GET)
	public String getAboutPage() {
		return "about";
	}

	@RequestMapping(value = "api", method = RequestMethod.GET)
	public String getApiPage() {
		return "api";
	}

	@RequestMapping(value = "check", method = RequestMethod.GET)
	public String getCheckPage() {
		return "check";
	}

    @RequestMapping(value = "databases", method = RequestMethod.GET)
    public String getDatabasesPage() {
        return "databases";
    }

    @RequestMapping(value = "help", method = RequestMethod.GET)
    public String getHelpPage() {
        return "help";
    }

}