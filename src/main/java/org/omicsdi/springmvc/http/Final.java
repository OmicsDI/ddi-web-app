package org.omicsdi.springmvc.http;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import java.io.*;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;
import java.util.Properties;

/**
 * Created by goucong on 18.10.16.
 */
public class  Final {

    static {
        Properties prop = new Properties();
        InputStream input = null;

        try {

            input = new FileInputStream("~/ddi-web-app/src/main/resources/ddiData.properties");

            // load a properties file
            prop.load(input);

            // get the property value and print it out
            System.out.println(prop.getProperty("ddi.web.service.url"));
            webServiceUrl = prop.getProperty("ddi.web.service.url");

        } catch (IOException ex) {
            ex.printStackTrace();
        } finally {
            if (input != null) {
                try {
                    input.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public static String webServiceUrl;

    public static final  Map<String,String> url = new HashMap<>();
    static{
        System.out.println("service url is " + webServiceUrl);
        url.put("web_service_url",webServiceUrl);
        url.put("datasetURL",webServiceUrl +"dataset/");
        url.put("getDatasetInfoURL", webServiceUrl + "dataset/get");
        url.put("getEnrichmentInfoURL",webServiceUrl + "enrichment/getEnrichmentInfo");
        url.put("getSynonymsForDatasetURL",webServiceUrl + "enrichment/getSynonymsForDataset");

    }
    public static Map<String,String> repositories = new Hashtable<>();

    static{
        repositories.put("pride","PRIDE");
        repositories.put("PRIDE", "PRIDE");
        repositories.put("peptideatlas", "PeptideAtlas");
        repositories.put("peptide_atlas", "PeptideAtlas");
        repositories.put("PeptideAtlas", "PeptideAtlas");
        repositories.put("massive", "MassIVE");
        repositories.put("MassIVE", "MassIVE");
        repositories.put("Massive", "MassIVE");
        repositories.put("metabolights", "MetaboLights");
        repositories.put("metabolights_dataset", "MetaboLights");
        repositories.put("MetaboLights", "MetaboLights");
        repositories.put("metabolome_workbench", "MetabolomicsWorkbench");
        repositories.put("metabolomics_workbench", "MetabolomicsWorkbench");
        repositories.put("Metabolomics Workbench", "MetabolomicsWorkbench");
        repositories.put("MetabolomicsWorkbench", "MetabolomicsWorkbench");
        repositories.put("ega", "EGA");
        repositories.put("EGA", "EGA");
        repositories.put("GPMDB", "GPMDB");
        repositories.put("gpmdb", "GPMDB");
        repositories.put("GNPS", "GNPS");
        repositories.put("metabolome_express", "MetabolomeExpress MetaPhenDB");
        repositories.put("MetabolomeExpress MetaPhenDB", "MetabolomeExpress MetaPhenDB");
        repositories.put("MetabolomeExpress", "MetabolomeExpress MetaPhenDB");
        repositories.put("ArrayExpress", "ArrayExpress");
        repositories.put("arrayexpress", "ArrayExpress");
        repositories.put("arrayexpress-repository", "ArrayExpress");
        repositories.put("expression-atlas", "ExpressionAtlas");
        repositories.put("ExpressionAtlas", "ExpressionAtlas");
        repositories.put("atlas-experiments", "ExpressionAtlas");
        repositories.put("Expression Atlas Experiments", "ExpressionAtlas");

    }
    public static Map<String,String> month_names_short = new Hashtable<>();
    static{

        month_names_short.put("00","");
        month_names_short.put("01","Jan");
        month_names_short.put("02","Feb");
        month_names_short.put("03","Mar");
        month_names_short.put("04","Apr");
        month_names_short.put("05","May");
        month_names_short.put("06","Jun");
        month_names_short.put("07","Jul");
        month_names_short.put("08","Aug");
        month_names_short.put("09","Sep");
        month_names_short.put("10","Oct");
        month_names_short.put("11","Nov");
        month_names_short.put("12","Dec");


    }
}
