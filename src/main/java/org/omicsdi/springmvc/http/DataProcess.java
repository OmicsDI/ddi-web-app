package org.omicsdi.springmvc.http;


import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by goucong on 12.10.16.
 */
public  class DataProcess {

    public static  int  long_text_length=500;
    public static Scope scope = new Scope();

    public static  class Scope {
        static org.json.JSONArray synonymsList;

        public static org.json.JSONArray title_sections;
        public static String accession;
        static String database;
        public static Map<String ,String> dataset = new HashMap<String ,String >();
        Scope() {

        }

        Scope(Map<String ,String > dataset, org.json.JSONArray title_sections,
              org.json.JSONArray synonymsList, String accession, String database) {
            this.synonymsList=synonymsList;
            this.dataset = dataset;
            this.title_sections= title_sections;
            this.accession=accession;
            this.database= database;
        }

    }

    public static Scope  splitByEnrichmentInfo(String jsonString) {


        JSONObject jsonObject = new JSONObject(jsonString);
        scope.accession = jsonObject.getString("accession");
        scope.database = jsonObject.getString("database");

        if (!jsonObject.getString("accession").isEmpty()) {

            JSONArray titleEnrichInfo = jsonObject.getJSONObject("synonyms").getJSONArray("name");
//            System.out.println(titleEnrichInfo.toString());

            if (jsonObject.getJSONObject("originalAttributes").getString("name").length() >= 1) {
                scope.dataset.put("name",jsonObject.getJSONObject("originalAttributes").getString("name")) ;
            }

            if (jsonObject.getJSONObject("originalAttributes").getString("description").length() >= 1) {
                scope.dataset.put("description",jsonObject.getJSONObject("originalAttributes").getString("description")) ;
            }
//            System.out.println(scope.database);
            scope.title_sections = get_section(scope.dataset.get("name"), titleEnrichInfo);
        }
        return scope;
    }

    public static JSONArray get_section(String wholetext, JSONArray enrichInfo) {

        if(wholetext.length()<500){
//            System.out.println(wholetext);
            long_text_length=wholetext.length();
        }

        if (enrichInfo == null && wholetext == null) {
            return null;
        }

        String modifiedWholeText = wholetext.toLowerCase();
        String modifyString = "__________________________________________________________________"+
                "______________________________________________________________________________";
        JSONArray sections = new JSONArray();
        int prevRealWordEnd = -1;
        int prevWordStart = -1;
        int prevWordEnd = -1;
        boolean tobeReduced;
        boolean beAnnotated;

//        System.out.println("enrichInfo.len "+enrichInfo.length());
//        System.out.println("wholetext.len "+wholetext.length());

        if (enrichInfo != null && wholetext != null) {
            for (int i = 0; i < enrichInfo.length(); i++) {
                int wordStart = enrichInfo.getJSONObject(i).getInt("from") - 1;
                int wordEnd = enrichInfo.getJSONObject(i).getInt("to") - 1;
//
//                System.out.println();
//                System.out.println("wordStart "+wordStart);
//                System.out.println("preWordEnd "+prevWordEnd);


                if (wordStart < prevWordEnd) {
                    continue;
                }
                String wordText = enrichInfo.getJSONObject(i).getString("text");
                int realWordStart = modifiedWholeText.indexOf(wordText);
//                System.out.println(realWordStart);
                int realWordEnd = realWordStart + wordText.length();

                ArrayList synonyms = get_synonyms(wordText);

                modifiedWholeText = modifiedWholeText.substring(0, realWordStart) +
                        modifyString.substring(0, wordText.length()) +
                        modifiedWholeText.substring(realWordEnd, modifiedWholeText.length());

                if (prevRealWordEnd + 1 < realWordStart) {
                    if (realWordStart > long_text_length) {
                        tobeReduced = true;
                    } else {
                        tobeReduced = false;
                    }
//
//                    System.out.println(wholetext);
//                    System.out.println("prevRealWordEnd "+ prevRealWordEnd);
//                    System.out.println("realWordStart "+realWordStart);

//                    System.out.println(wholetext.substring(prevRealWordEnd < 0 ? 0:prevRealWordEnd, realWordStart - 1));
                    String sub1 = wholetext.substring(prevRealWordEnd<0 ? 0: prevRealWordEnd, realWordStart - 1);

//                     sub=sub.replace(":","@");
//                    String text = "text:"+sub;
//                        System.out.println(text);
                        JSONObject section = new JSONObject("{" +
                                "\"beAnnotated\":" + false + "," +
                                "\"synonyms\":" + null + "," +
                                "\"tobeReduced\":" + tobeReduced + "}");
                        section=section.put("text",sub1);

                        sections.put(section);



                }
//                System.out.println("hello");


                if (realWordStart > long_text_length) {
                    tobeReduced = true;
                } else {
                    tobeReduced = false;
                }

                String sub2 = wholetext.substring(realWordStart, realWordEnd);
                JSONObject section = new JSONObject("{" +
                        "\"beAnnotated\":"+true+"," +
                        " \"synonyms\":"+synonyms+"," +
                        "\"tobeReduced\":"+tobeReduced+"}");
                section=section.put("text",sub2);

                sections.put(section);

                prevRealWordEnd = realWordEnd;
                prevWordStart = wordStart;
                prevWordEnd = wordEnd;
            }

        }
        if (prevRealWordEnd + 1 < long_text_length) {
            tobeReduced = false;

            String sub3 = wholetext.substring(prevRealWordEnd + 1, long_text_length);
            JSONObject section = new JSONObject("{" +
                    "\"beAnnotated\":"+false+"," +
                    " \"synonyms\":"+null+"," +
                    "\"tobeReduced\":"+tobeReduced+"}");
            section=section.put("text",sub3);
            sections.put(section);
            prevRealWordEnd = long_text_length;
        }
        if (prevRealWordEnd + 1 <= wholetext.length()) {
            tobeReduced = true;
            String sub4 = wholetext.substring(prevRealWordEnd, wholetext.length());
            JSONObject section = new JSONObject("{" +
                    "\"beAnnotated\":"+false+"," +
                    "\"synonyms\":"+null+"," +
                    "\"tobeReduced\":"+tobeReduced+"}");
            section=section.put("text",sub4);
            sections.put(section);
        }
        return sections;
    }
    public static  ArrayList get_synonyms(String word) {

//        if (scope.synonymsList == null){
//            scope.synonymsList = Request.getSynonymsList(scope.accession, scope.database);
////            System.out.println(scope.synonymsList.toString());
//        }


        if (scope.synonymsList == null || word == null) {
            return null;
        }


        word = word.toLowerCase();
        JSONArray synonyms = new JSONArray();
//        System.out.println(scope.synonymsList.toString());
        for (int i = 0; i < scope.synonymsList.length(); i++) {
            if (word.equals(scope.synonymsList.getJSONObject(i).getString("wordLabel"))) {

                synonyms = scope.synonymsList.getJSONObject(i).getJSONArray("synonyms");
//                System.out.println(synonyms.toString());
                break;
            }
        }

        if (synonyms == null || synonyms.length() < 1)
            return null;

        //to make synonyms unique
        ArrayList unique_synonyms = new ArrayList();
        for (int i = 0; i < synonyms.length(); i++) {

            String synonym = (String) synonyms.get(i);

//            System.out.println(synonym.toString());
            if (!unique_synonyms.toString().contains("synonym")) {
                unique_synonyms.add(synonym);
            }
        }
        return unique_synonyms;
    }
}