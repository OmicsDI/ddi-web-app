package org.omicsdi.springmvc.controller;

//import org.apache.commons.lang.StringEscapeUtils;

import org.omicsdi.springmvc.http.DataProcess;
import org.omicsdi.springmvc.http.Final;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


/**
 * Created by ricardo&goucong on 2016/10/12
 */
@Controller
@RequestMapping("/")
public class DatasetController {

    @RequestMapping(value = "/dataset/{domain}/{acc:.+}", method = RequestMethod.GET)
    public String getContext(@PathVariable("domain") String domain,
                             @PathVariable("acc") String acc,
                             ModelMap model) {

        DataProcess.Scope scope = DataProcess.getScopeObject(domain,acc);
        model.addAttribute("name", scope.target_title.replaceAll("\"",""));
        model.addAttribute("datasetDomain", domain);
        model.addAttribute("datasetAcc",acc);
        model.addAttribute("meta_dataset_title",scope.dataset.get("meta_dataset_title"));
        model.addAttribute("meta_dataset_abstract", scope.dataset.get("meta_dataset_abstract"));
        model.addAttribute("meta_originalURL",scope.dataset.get("meta_originalURL"));
        model.addAttribute("meta_ddiURL", Final.url.get("datasetURL") + Final.repositories.get(domain) + "/" + acc);
        model.addAttribute("meta_dataset_identifier",acc);
        model.addAttribute("keywords",scope.dataset.get("keywords"));
        model.addAttribute("all_authors",scope.dataset.get("all_authors"));
        model.addAttribute("omics_type",scope.dataset.get("omics_type"));
        model.addAttribute("journal",scope.dataset.get("journal"));
        if(!scope.meta_entries.toString().equals("null")){
            model.addAttribute("meta_entries",scope.meta_entries.toList());
        }
        return "dataset";

    }
}
