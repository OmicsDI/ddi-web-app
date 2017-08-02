package org.omicsdi.springmvc.http;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by goucong on 12.10.16.
 */
public class Request {

    /**
     *
     * @param url
     * @param parameters
     * @return
     * do GET
     */
    public static String sendGet(String url, Map<String, String> parameters) {
        String result = "";
        BufferedReader in = null;// input stream
        StringBuffer sub = new StringBuffer();// save param
        String params = "";// after encode
        try {
            // encode request params
            if (parameters.size() == 1) {
                for (String name : parameters.keySet()) {
                    sub.append(name).append("=").append(
                            java.net.URLEncoder.encode(parameters.get(name),
                                    "UTF-8"));
                }
                params = sub.toString();
            } else {
                for (String name : parameters.keySet()) {
                    sub.append(name).append("=").append(
                            java.net.URLEncoder.encode(parameters.get(name),
                                    "UTF-8")).append("&");
                }
                String temp_params = sub.toString();
                params = temp_params.substring(0, temp_params.length() - 1);
            }
            String full_url = url + "?" + params;
            System.out.println(full_url);
            java.net.URL connURL = new java.net.URL(full_url);
            java.net.HttpURLConnection httpConn = (java.net.HttpURLConnection) connURL
                    .openConnection();
            //Setting common attributes
            httpConn.setRequestProperty("Accept", "*/*");
            httpConn.setRequestProperty("Connection", "Keep-Alive");
            httpConn.setRequestProperty("User-Agent",
                    "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)");

            in = new BufferedReader(new InputStreamReader(httpConn
                    .getInputStream(), "UTF-8"));
            String line;

            while ((line = in.readLine()) != null) {
                result += line;
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (in != null) {
                    in.close();
                }
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        return result;
    }

    /**
     * get  enrichmentInfo ;
     */
    public static String getJson(String accession, String database, String url){
        String result = new String();
        Map<String, String> parameters = new HashMap<String, String>();
        parameters.put("accession", accession);
        parameters.put("database",database);

        result = sendGet(url,parameters);
        return result;
    }

    public static String getPublication(String accession,  String url){
        String result = new String();
        Map<String, String> parameters = new HashMap<String, String>();
        parameters.put("acc", accession);

        result = sendGet(url,parameters);
        return result;
    }

    /**
     * return dataset json  to get  meta_dataset_title and meta_dataset_abstract ;
     */
    public static String getDatasetJson(String accession, String database, String url){
        String result = new String();
        Map<String, String> parameters = new HashMap<String, String>();
        parameters.put("acc", accession);
        parameters.put("database",database);

        result = sendGet(url,parameters);
        return result;
    }
    //when request url contains fallowing domain,we change it
    public static String changeDatabaseName(String database){

        if (database.equals("metabolomics_workbench")){
            return "Metabolomics_Workbench";
        }
        else if (database.equals("gpmdb")||database.equals("ega")){
            return database.toUpperCase();
        }
        else return database;
    }
    @Deprecated
    public static JSONArray getSynonymsList(String accession, String database){
        String  url="http://www.omicsdi.org/ws/enrichment/getSynonymsForDataset";
        String jsonString = getJson(accession, changeDatabaseName(database),url);
        JSONObject jsonObject = new JSONObject(jsonString);
        JSONArray synonymsList = jsonObject.getJSONArray("synonymsList");
        return  synonymsList;
    }


}


