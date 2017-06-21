package uk.ac.ebi.ddi.ws.modules.database.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

/**
 * Created by root on 16.05.17.
 */
@Document(collection = "databases")
public class DatabaseDetail implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    String databaseName;

    String title;

    String source;

    String imgAlt;

    String searchUrl;

    String description;

    byte[] image;


    public String getDatabaseName() {
        return databaseName;
    }

    public void setDatabaseName(String databaseName) {
        this.databaseName = databaseName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getImgAlt() {
        return imgAlt;
    }

    public void setImgAlt(String imgAlt) {
        this.imgAlt = imgAlt;
    }

    public String getSearchUrl() {
        return searchUrl;
    }

    public void setSearchUrl(String searchUrl) {
        this.searchUrl = searchUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }



}
