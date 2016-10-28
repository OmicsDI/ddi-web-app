package org.omicsdi.springmvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.charset.StandardCharsets;


/**
 * Created by gaur on 28/10/16.
 */
@Controller
@RequestMapping("/")
public class SeoController {

    @RequestMapping(value = "/robots.txt",produces = {"text/plain"}, method = RequestMethod.GET)
    @ResponseBody
    public String getRobotsFile()
    {
        String outputText = "User-Agent: *" +
                             "\n" + "Disallow:";
        return outputText;
    }

    @RequestMapping(value = "/sitemap.xml", produces = {"application/xml"},method = RequestMethod.GET)
    @ResponseBody
    public String getSitemapXml()
    {
        String sitemapText;
/*        System.out.println("Working Directory = " +
                System.getProperty("user.dir"));*/
        try {
            sitemapText = new String(Files.readAllBytes(Paths.get("sitemap.xml")), StandardCharsets.UTF_8);
        }
        catch(IOException ex) {
            sitemapText = "inside exception " + ex.getMessage();
        }
        return sitemapText;
    }
}
