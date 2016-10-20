package org.omicsdi.springmvc.controller;

//import org.apache.commons.lang.StringEscapeUtils;

import org.json.JSONArray;
import org.json.JSONObject;
import org.omicsdi.springmvc.http.DataProcess;
import org.omicsdi.springmvc.http.ExceptionHandel;
import org.omicsdi.springmvc.http.Request;
import org.omicsdi.springmvc.http.URL;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.util.HtmlUtils;


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

        String jsonString = Request.GetJson(acc,Request.ChangeDatabaseName(domain), URL.getEnrichmentInfo);
        DataProcess.Scope scope = DataProcess.splitByEnrichmentInfo(jsonString);
        JSONArray target_title__sections = scope.title_sections;

        String target_title =  new String();
        for (int i=0;i<target_title__sections.length();i++){

            target_title+=target_title__sections.getJSONObject(i).get("text").toString()+" ";
        }
        model.addAttribute("name", target_title);
        model.addAttribute("datasetDomain", Request.ChangeDatabaseName(domain));
        model.addAttribute("datasetAcc",acc);

        String datasetJson = Request.GetDatasetJson(acc,Request.ChangeDatabaseName(domain),URL.getDatasetDetail);
        JSONObject datasetDetail =  new JSONObject(datasetJson);
        String meta_dataset_title = datasetDetail.getString("name");
        //make <> tags in meta legal
        String meta_dataset_abstract = HtmlUtils.htmlEscape(datasetDetail.getString("description"));
        model.addAttribute("meta_dataset_title",meta_dataset_title);
        //replace {{  by { , and replace }} by }
        model.addAttribute("meta_dataset_abstract",ExceptionHandel.illegalCharFilter(meta_dataset_abstract,"}},{{"));
        return "dataset";

    }
}
