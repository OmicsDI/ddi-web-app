package uk.ac.ebi.ddi.security.controller;

import org.apache.commons.io.IOUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import uk.ac.ebi.ddi.security.model.DatabaseDetail;
import uk.ac.ebi.ddi.security.service.DatabaseDetailService;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;

/**
 * Created by root on 16.05.17.
 */
@RestController
@RequestMapping("/api/database")
public class DatabaseController {

    @Autowired
    DatabaseDetailService databaseDetailService;
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    @CrossOrigin
    public List<DatabaseDetail> getDatabaseList(){
        List<DatabaseDetail> list = databaseDetailService.getDatabaseList();
        return list;
    }
    @Autowired
    ServletContext servletContext;

    @RequestMapping(value = "/{databaseName}/picture", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    public byte[] getDatabasePicture(@PathVariable String databaseName, final HttpServletResponse response) throws IOException {
        response.setHeader("Cache-Control", "no-cache");
        DatabaseDetail databaseDetail = databaseDetailService.findDatabaseByName(databaseName);
        byte[] b = databaseDetail.getImage();
        if(null==b){
            InputStream in = servletContext.getResourceAsStream("no_image.jpg");
            b = IOUtils.toByteArray(in);
        }
        return b;
    }
    @RequestMapping("/initDefaultLocal")
    private void initLocalData(){

        InputStream databasesInputStream = this.getClass().getResourceAsStream("/databases.json");
        String databaseJSONString = null;
        try {
            databaseJSONString = IOUtils.toString(databasesInputStream);
            databasesInputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        JSONArray databaseArray = new JSONArray(databaseJSONString);
        for(int i = 0;i<databaseArray.length();i++){
            JSONObject database = databaseArray.getJSONObject(i);
            DatabaseDetail databaseDetail = new DatabaseDetail();
            databaseDetail.setDatabaseName(database.getString("databaseName"));
            databaseDetail.setTitle(database.getString("title"));
            String imageUrl = database.getString("image");
            InputStream imgInputStream = this.getClass().getResourceAsStream("/"+imageUrl);
            byte[] imgBytes = null ;
            try {
                imgBytes = IOUtils.toByteArray(imgInputStream);
            } catch (IOException e) {
                e.printStackTrace();
            }
            databaseDetail.setImage(imgBytes);
            databaseDetail.setImgAlt(database.getString("imgAlt"));
            databaseDetail.setSearchUrl(database.getString("searchUrl"));
            databaseDetail.setSource(database.getString("source"));
            databaseDetail.setDescription(database.getString("description"));
            databaseDetailService.saveDatabase(databaseDetail);
        }
    }
}
