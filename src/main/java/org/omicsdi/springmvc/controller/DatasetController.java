package org.omicsdi.springmvc.controller;

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
        System.out.println(acc);
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
        String meta_dataset_abstract = datasetDetail.getString("description");

        model.addAttribute("meta_dataset_title",meta_dataset_title);
        model.addAttribute("meta_dataset_abstract", ExceptionHandel.illegalCharFilter(meta_dataset_abstract,"{"));
        System.out.println(meta_dataset_title);
        System.out.println(ExceptionHandel.illegalCharFilter(meta_dataset_abstract,"{"));
        return "dataset";
    }
}
