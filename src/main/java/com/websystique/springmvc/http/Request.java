package com.websystique.springmvc.http;

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

    public static String sendGet(String url, Map<String, String> parameters) {
        String result = "";// 返回的结果
        BufferedReader in = null;// 读取响应输入流
        StringBuffer sb = new StringBuffer();// 存储参数
        String params = "";// 编码之后的参数
        try {
            // 编码请求参数
            if (parameters.size() == 1) {
                for (String name : parameters.keySet()) {
                    sb.append(name).append("=").append(
                            java.net.URLEncoder.encode(parameters.get(name),
                                    "UTF-8"));
                }
                params = sb.toString();
            } else {
                for (String name : parameters.keySet()) {
                    sb.append(name).append("=").append(
                            java.net.URLEncoder.encode(parameters.get(name),
                                    "UTF-8")).append("&");
                }
                String temp_params = sb.toString();
                params = temp_params.substring(0, temp_params.length() - 1);
            }
            String full_url = url + "?" + params;
            System.out.println(full_url);
            // 创建URL对象
            java.net.URL connURL = new java.net.URL(full_url);
            // 打开URL连接
            java.net.HttpURLConnection httpConn = (java.net.HttpURLConnection) connURL
                    .openConnection();
            // 设置通用属性
            httpConn.setRequestProperty("Accept", "*/*");
            httpConn.setRequestProperty("Connection", "Keep-Alive");
            httpConn.setRequestProperty("User-Agent",
                    "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)");

            in = new BufferedReader(new InputStreamReader(httpConn
                    .getInputStream(), "UTF-8"));
            String line;
            // 读取返回的内容
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
    public static String GetJson(String accession,String database,String url){
        String result = new String();
        Map<String, String> parameters = new HashMap<String, String>();
        parameters.put("accession", accession);
        parameters.put("database",database);

//        url=http://www.omicsdi.org/ws/enrichment/getEnrichmentInfo
        result = sendGet(url,parameters);
        return result;
    }
    public static String ChangeDatabaseName(String database){
        if (database.equals("metabolomics_workbench")){
            return "Metabolomics_Workbench";
        }
        else if (database.equals("gpmdb")||database.equals("ega")){
            return database.toUpperCase();
        }
        else return database;
    }
    public static JSONArray getSynonymsList(String accession, String database){
        String  url="http://www.omicsdi.org/ws/enrichment/getSynonymsForDataset";
        String jsonString = GetJson(accession,ChangeDatabaseName(database),url);
        JSONObject jsonObject = new JSONObject(jsonString);
        JSONArray synonymsList = jsonObject.getJSONArray("synonymsList");
        return  synonymsList;
    }

}


