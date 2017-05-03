package uk.ac.ebi.ddi.ws.modules.dataset.util;


import com.google.gson.JsonObject;
import uk.ac.ebi.ddi.ws.modules.dataset.model.PubmedPublication;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.google.gson.Gson;


/**
 * Created by baimz on 2015/5/6.
 */
public class PubmedUtil {

private static final Logger logger = LoggerFactory.getLogger(PubmedUtil.class);

 public static List<PubmedPublication> getPubmedList(String[] pubmedids) throws Exception {
        List<PubmedPublication> pubmedList = new ArrayList<>();
        Gson gson = new Gson();
     for (String pubmedid : pubmedids) {
         if (pubmedid == null) break;
         String jsonText = readUrl("http://www.ebi.ac.uk/europepmc/webservices/rest/search/query=" + pubmedid + "&resulttype=core&format=json");
         JsonObject jsonObject = gson.fromJson(jsonText, JsonObject.class);
         JsonObject resultList = jsonObject.get("resultList").getAsJsonObject();
         JsonObject entry = resultList.get("result").getAsJsonArray().get(0).getAsJsonObject();

         PubmedPublication pubmeditem = new PubmedPublication();
         pubmeditem.setId(pubmedid);
         pubmeditem.setTitle(entry.get("title").toString().replace("\"", ""));
         pubmeditem.setPubabstract(entry.get("abstractText").toString().replace("\"", ""));
         pubmeditem.setPublicationDate(entry.get("firstPublicationDate").toString().replace("\"", ""));
         pubmeditem.setCycle("testcyclehere");

         pubmedList.add(pubmeditem);
     }

        return pubmedList;
    }


private static String readUrl(String urlString) throws Exception {
        BufferedReader reader = null;
        try {
            URL url = new URL(urlString);
            reader = new BufferedReader(new InputStreamReader(url.openStream()));
            StringBuilder buffer = new StringBuilder();
            int read;
            char[] chars = new char[1024];
            while ((read = reader.read(chars)) != -1)
                buffer.append(chars, 0, read);

            return buffer.toString();
        } finally {
            if (reader != null)
                reader.close();
        }
    }


}
