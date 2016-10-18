package org.omicsdi.springmvc.controller;

import org.json.JSONArray;
import org.omicsdi.springmvc.http.DataProcess;
import org.json.JSONObject;
import org.omicsdi.springmvc.http.Request;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


/**
 * Created by ricardo&&goucong on 2016/10/12
 *
 * These pages still have bugs;
// * dataset/arrayexpress-repository/E-MTAB-4995
// * dataset/arrayexpress-repository/E-MTAB-4561
 * localhost:8080/dataset/metabolights_dataset/MTBLS321
// * dataset/pride/PXD000004
 * dataset/metabolomics_workbench/ST000106
 */
@Controller
@RequestMapping("/")
public class DatasetGetContextController {

    @RequestMapping(value = "/dataset/{domain}/{acc}", method = RequestMethod.GET)
    public String getContext(@PathVariable("domain") String domain,
                             @PathVariable("acc") String acc,
                             ModelMap model) {

        String jsonString = Request.GetJson(acc,domain,"http://www.omicsdi.org/ws/enrichment/getEnrichmentInfo");
        JSONObject jsonObject = new JSONObject(jsonString);
        DataProcess.splitByEnrichmentInfo(jsonString);
        JSONArray target_title__sections = DataProcess.scope.title_sections;
        String target_title =  new String();
//        System.out.println(target_title__sections.toString());
        for (int i=0;i<target_title__sections.length();i++){

//            target_title+=target_title__sections.getJSONObject(i).getString("text")+" ";
            target_title+=target_title__sections.getJSONObject(i).get("text").toString()+" ";
        }
        model.addAttribute("name", target_title);
        model.addAttribute("datasetDomain", domain);
        model.addAttribute("datasetAcc", acc);
        String datasetJson = Request.GetDatasetJson(acc,domain,"http://www.omicsdi.org/ws/dataset/get");
        JSONObject datasetDetail =  new JSONObject(datasetJson);
        String meta_dataset_title = datasetDetail.getString("name");
        String meta_dataset_abstract = datasetDetail.getString("description");
        model.addAttribute("meta_dataset_title",meta_dataset_title);
        model.addAttribute("meta_dataset_abstract",meta_dataset_abstract);


        return "dataset";
    }


}
