package org.omicsdi.springmvc.http;


import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.web.util.HtmlUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

/**
 * Created by goucong on 12.10.16.
 */
public  class DataProcess {

    public static int long_text_length = 500;

    public static class Scope {


        public org.json.JSONArray synonymsList;
        public org.json.JSONArray title_sections;
        public String accession;
        public String database;
        public Map<String, String> dataset = new HashMap<>();
        public String target_title = "";
        public JSONArray meta_entries;
        public JSONArray publicationIds;
        public JSONArray related_datasets;
        Scope() {

        }

        public Scope(Map<String, String> dataset, org.json.JSONArray title_sections,
                     org.json.JSONArray synonymsList, String accession, String database,
                     String target_title, JSONArray meta_entries,JSONArray publicationIds,
                     JSONArray related_datasets) {
            this.synonymsList = synonymsList;
            this.dataset = dataset;
            this.title_sections = title_sections;
            this.accession = accession;
            this.database = database;
            this.target_title = target_title;
            this.meta_entries = meta_entries;
            this.publicationIds = publicationIds;
            this.related_datasets = related_datasets;
        }

    }

    public static Scope getScopeObject(String domain, String acc) {

        Scope scope = new Scope();
        splitByEnrichmentInfo(domain, acc, scope);
        getDatasetInfo(domain, acc, scope);
//            get_related_datasets(domain,acc,scope);

        return scope;

    }

    public static Scope splitByEnrichmentInfo(String domain, String acc, Scope scope) {


        String jsonString = Request.getJson(acc, Request.changeDatabaseName(domain), Final.url.get("getEnrichmentInfoURL"));
        try{
            JSONObject jsonObject = new JSONObject(jsonString);
            scope.accession = ExceptionHandel.filterNull(jsonObject.get("accession").toString());
            scope.database = ExceptionHandel.filterNull(jsonObject.get("database").toString());

            if (!scope.accession.isEmpty()) {

                JSONArray titleEnrichInfo = jsonObject.getJSONObject("synonyms").getJSONArray("name");

                String name = ExceptionHandel.filterNull(jsonObject.getJSONObject("originalAttributes").get("name").toString());
                if (name.length() >= 1) {
                    scope.dataset.put("name", name);
                }
                String description = ExceptionHandel.filterNull(jsonObject.getJSONObject("originalAttributes").get("description").toString());
                if (description.length() >= 1) {
                    scope.dataset.put("description", description);
                }

                scope.title_sections = get_section(scope.dataset.get("name"), titleEnrichInfo, scope);

                for (int i = 0; i < scope.title_sections.length(); i++) {

                    scope.target_title += scope.title_sections.getJSONObject(i).get("text").toString() + " ";
                }

            }
            return scope;
        }
        catch(JSONException e){
            e.printStackTrace();
            scope.accession = "";
            scope.database = "";
            scope.dataset.put("name","");
            scope.dataset.put("description","");
            scope.target_title = "";
            scope.title_sections = new JSONArray();
            return scope;
        }


    }

    public static Scope getDatasetInfo(String domain, String acc, Scope scope) {

        try{
            String datasetJson = Request.getDatasetJson(acc, Request.changeDatabaseName(domain), Final.url.get("getDatasetInfoURL"));
            JSONObject datasetInfo = new JSONObject(datasetJson);
            String full_dataset_link = datasetInfo.get("full_dataset_link").toString();
            String keywords = ExceptionHandel.filterNull(datasetInfo.get("keywords").toString());

            scope.dataset.put("meta_dataset_title", ExceptionHandel.filterNull(datasetInfo.get("name").toString()));
            //make <> tags in meta legal
            String meta_dataset_abstract = HtmlUtils.htmlEscape(ExceptionHandel.filterNull(datasetInfo.get("description").toString())).replaceAll("\"","");
            //replace {{  by { , and replace }} by }
            scope.dataset.put("meta_dataset_abstract", ExceptionHandel.illegalCharFilter(meta_dataset_abstract, "}},{{"));
            scope.dataset.put("meta_originalURL", ExceptionHandel.filterNull(full_dataset_link));
            scope.dataset.put("meta_ddiURL", Final.url.get("DatasetURL") + Final.repositories.get(domain) + "/" + acc);
            scope.dataset.put("keywords",keywords.isEmpty() ? "" :keywords.substring(1,keywords.length()-1).replaceAll("\"",""));

            String organization = ExceptionHandel.filterNull(datasetInfo.get("organization").toString());
            if(!datasetInfo.get("omics_type").toString().equals("null")){
                String omics_type = datasetInfo.getJSONArray("omics_type").toString();
                scope.dataset.put("omics_type",omics_type.substring(1,omics_type.length()-1).replaceAll("\"",""));

            }
            else{
                scope.dataset.put("omics_type","");
            }


            String omics_type = "";
            /*for(Object omicsType : ExceptionHandel.filterNull(datasetInfo.getJSONArray("omics_type").toString()))
            {
                omics_type = "variableMeasured: " + omicsType.toString() + ",";
            }*/
            //scope.dataset.put("omics_type",omics_type.substring(1,omics_type.length()-1).replaceAll("\"",""));
            scope.dataset.put("omics_type",ExceptionHandel.filterNull(datasetInfo.get("omics_type").toString()));
            /*        for(Object org: datasetInfo.getJSONArray("organization")) {

            }*/
            scope.dataset.put("organization", ExceptionHandel.filterNull(datasetInfo.get("organization").toString()));
            scope.dataset.put("submitter", ExceptionHandel.filterNull(datasetInfo.get("submitter").toString()));

            if(!ExceptionHandel.filterNull(datasetInfo.get("dates").toString()).isEmpty()) {
            JSONObject datasetDates = new JSONObject(datasetInfo.get("dates").toString());
                if(datasetDates != null && !datasetDates.isNull("publication")) {
                    JSONArray pubDate = new JSONArray(datasetDates.get("publication").toString());
                    scope.dataset.put("pubDate", pubDate.get(0).toString());
                    String pubYear = pubDate.get(0).toString().split("-")[0];
                    scope.dataset.put("pubYear", pubYear);
                }
            }


            String all_authors = "";
            String journal = "";

            if(!datasetInfo.get("submitter").equals(null))
                all_authors = all_authors + datasetInfo.get("submitter").toString().replace("[","").replace("]","");  //.replace("\"","");

            if(!datasetInfo.get("labHead").equals(null))
                all_authors = all_authors + "," + datasetInfo.get("labHead").toString().replace("[","").replace("]",""); //.replace("\"","");

            String meta_entry_arr = "[";
            if(datasetInfo.get("publicationIds").equals(null)) {
                scope.meta_entries = new JSONArray();
                all_authors = "[" + all_authors + "]";
                scope.dataset.put("all_authors",all_authors);
                scope.dataset.put("journal",journal);
                return scope;
            }
            else{
                scope.publicationIds = datasetInfo.getJSONArray("publicationIds");
            }


            for (int i = 0; i < scope.publicationIds.length(); i++) {
                String pubmed_id = ExceptionHandel.filterNull(scope.publicationIds.get(i).toString());

                String publication_url = Final.url.get("web_service_url") + "publication/list";

                String publication_json = Request.getPublication(pubmed_id, publication_url);
                JSONObject publication_data = new JSONObject(publication_json);
                JSONObject entity = publication_data.getJSONArray("publications").getJSONObject(0);

                scope.dataset.put("journal",ExceptionHandel.filterNull(entity.get("journal").toString()).replaceAll("\"",""));
                if(entity.get("date").toString().length()==8) {
                    String pub_year = entity.getString("date").substring(0, 4);
                    String pub_month = entity.getString("date").substring(4, 6);
                    String pub_day = entity.getString("date").substring(6, 8);

                    entity.put("pub_date_month", pub_month);
                    entity.put("pub_date_year", pub_year);
                    entity.put("pub_date_day", pub_day.equals("00") ? "" : pub_day);
                }

                JSONArray authors = new JSONArray();

                for (int j = 0; j < entity.getJSONArray("authors").length(); j++) {

                    Pattern reg_surname = Pattern.compile(" [A-Z]{1,2}$",Pattern.MULTILINE);
                    java.util.regex.Matcher matcher1 = reg_surname.matcher(entity.getJSONArray("authors").get(j).toString());
                    ArrayList reg_result = new ArrayList();
                    String surname ="";

                    while (matcher1.find()) {
                        reg_result.add(matcher1.group());
                    }
                    surname = reg_result.isEmpty() ? "" : reg_result.get(0).toString();


                    Pattern reg_firstname = Pattern.compile("^.*? ");
                    java.util.regex.Matcher matcher2 =
                            reg_firstname.matcher(ExceptionHandel.filterNull(entity.getJSONArray("authors").get(j).toString()));
                    ArrayList firstname_result = new ArrayList();
                    while (matcher2.find()) {
                        firstname_result.add(matcher2.group());
                    }
                    String firstname = firstname_result.isEmpty() ? "" : firstname_result.get(0).toString();

                    String author_for_searching = firstname + " " + surname;

                    JSONObject author = new JSONObject();
                    author.put("fullname", entity.getJSONArray("authors").get(j).toString());
                    author.put("name_for_searching", author_for_searching);
                    authors.put(author);
                    all_authors+=author.getString("fullname")+" ,";
                }


                JSONObject meta_entry_title = new JSONObject();
                meta_entry_title.put("name", "citation_title");
                meta_entry_title.put("content", ExceptionHandel.filterNull(entity.get("title").toString()));

                JSONArray meta_entries_pri = new JSONArray();
                meta_entries_pri.put(meta_entry_title);

                JSONObject meta_entry_author = new JSONObject();

                String authors_jsonstr = "[";
                for (int n = 0; n < authors.length(); n++) {
                    meta_entry_author.put("name", "citation_author");
                    meta_entry_author.put("content", authors.getJSONObject(n).getString("fullname"));
                    authors_jsonstr = authors_jsonstr +meta_entry_author.toString()+",";
                }
                String target_authors_jsonstr = authors_jsonstr.substring(0,authors_jsonstr.length()-1)+']';

                meta_entries_pri.put(new JSONArray(target_authors_jsonstr));

                JSONObject meta_entry_pubdate = new JSONObject();
                meta_entry_pubdate.put("name", "citation_pubdate");
                meta_entry_pubdate.put("content", entity.getString("pub_date_year")+" "+
                        Final.month_names_short.get(entity.getString("pub_date_month"))+ " "+entity.getString("pub_date_day")+";");
                meta_entries_pri.put(meta_entry_pubdate);

                meta_entry_arr = meta_entry_arr +meta_entries_pri.toString() + ",";

            }

            String target_meta_entry_arr = meta_entry_arr.substring(0,meta_entry_arr.length()-1)+']';
            scope.meta_entries = new JSONArray(target_meta_entry_arr);
            scope.dataset.put("all_authors",all_authors.substring(0,all_authors.length()-1));

            return scope;
        }
        catch (JSONException e){
            e.printStackTrace();
            scope.dataset.put("meta_dataset_title","");
            scope.dataset.put("meta_dataset_abstract", "");
            scope.dataset.put("meta_originalURL","");
            scope.dataset.put("meta_ddiURL", Final.url.get("DatasetURL") + Final.repositories.get(domain) + "/" + acc);
            scope.dataset.put("keywords","");
            scope.dataset.put("omics_type","");
            scope.dataset.put("all_authors","");
            scope.dataset.put("journal","");
            scope.publicationIds = new JSONArray();
            scope.meta_entries = new JSONArray();
            return scope;
        }

    }

    public static JSONArray get_section(String wholetext, JSONArray enrichInfo, Scope scope) {

        if (wholetext.length() < 500) {

            long_text_length = wholetext.length();
        }

        if (enrichInfo == null && wholetext == null) {
            return null;
        }

        String modifiedWholeText = wholetext.toLowerCase();
        String modifyString = "__________________________________________________________________" +
                "______________________________________________________________________________";
        JSONArray sections = new JSONArray();
        int prevRealWordEnd = -1;
        int prevWordStart = -1;
        int prevWordEnd = -1;
        boolean tobeReduced;
        boolean beAnnotated;

        if (enrichInfo != null && wholetext != null) {
            for (int i = 0; i < enrichInfo.length(); i++) {

                int wordStart = enrichInfo.getJSONObject(i).getInt("from") - 1;
                int wordEnd = enrichInfo.getJSONObject(i).getInt("to") - 1;

                if (wordStart < prevWordEnd) {
                    continue;
                }
                String wordText = ExceptionHandel.filterNull(enrichInfo.getJSONObject(i).get("text").toString());
                int realWordStart = modifiedWholeText.indexOf(wordText);
                int realWordEnd = realWordStart + wordText.length();

                ArrayList synonyms = get_synonyms(wordText, scope);

                modifiedWholeText = modifiedWholeText.substring(0, realWordStart) +
                        modifyString.substring(0, wordText.length()) +
                        modifiedWholeText.substring(realWordEnd, modifiedWholeText.length());

                if (prevRealWordEnd + 1 < realWordStart) {
                    if (realWordStart > long_text_length) {
                        tobeReduced = true;
                    } else {
                        tobeReduced = false;
                    }

                    String sub1 = wholetext.substring(prevRealWordEnd < 0 ? 0 : prevRealWordEnd, realWordStart - 1);
                    JSONObject section = new JSONObject("{" +
                            "\"beAnnotated\":" + false + "," +
                            "\"synonyms\":" + null + "," +
                            "\"tobeReduced\":" + tobeReduced + "}");
                    section = section.put("text", sub1);

                    sections.put(section);

                }


                if (realWordStart > long_text_length) {
                    tobeReduced = true;
                } else {
                    tobeReduced = false;
                }

                String sub2 = wholetext.substring(realWordStart, realWordEnd);
                JSONObject section = new JSONObject("{" +
                        "\"beAnnotated\":" + true + "," +
                        " \"synonyms\":" + synonyms + "," +
                        "\"tobeReduced\":" + tobeReduced + "}");
                section = section.put("text", sub2);

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
                    "\"beAnnotated\":" + false + "," +
                    " \"synonyms\":" + null + "," +
                    "\"tobeReduced\":" + tobeReduced + "}");
            section = section.put("text", sub3);
            sections.put(section);
            prevRealWordEnd = long_text_length;
        }
        if (prevRealWordEnd + 1 <= wholetext.length()) {
            tobeReduced = true;
            String sub4 = wholetext.substring(prevRealWordEnd, wholetext.length());
            JSONObject section = new JSONObject("{" +
                    "\"beAnnotated\":" + false + "," +
                    "\"synonyms\":" + null + "," +
                    "\"tobeReduced\":" + tobeReduced + "}");
            section = section.put("text", sub4);
            sections.put(section);
        }
        return sections;
    }

    public static ArrayList get_synonyms(String word, Scope scope) {


        if (scope.synonymsList == null || word == null) {
            return new ArrayList();
        }

        word = word.toLowerCase();
        JSONArray synonyms = new JSONArray();

        for (int i = 0; i < scope.synonymsList.length(); i++) {
            if (word.equals(ExceptionHandel.filterNull(scope.synonymsList.getJSONObject(i).get("wordLabel").toString()))) {

                synonyms = scope.synonymsList.getJSONObject(i).getJSONArray("synonyms");

                break;
            }
        }

        if (synonyms == null || synonyms.length() < 1)
            return null;

        //to make synonyms unique
        ArrayList unique_synonyms = new ArrayList();
        for (int i = 0; i < synonyms.length(); i++) {

            String synonym = (String) synonyms.get(i);

            if (!unique_synonyms.toString().contains("synonym")) {
                unique_synonyms.add(synonym);
            }
        }
        return unique_synonyms;
    }
}