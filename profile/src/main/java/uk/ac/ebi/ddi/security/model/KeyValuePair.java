package uk.ac.ebi.ddi.security.model;

/**
 * Created by user on 5/23/2017.
 */
public class KeyValuePair {
    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    private String key;
    private String value;

    public KeyValuePair(){} //default ctor for serializer
    public KeyValuePair(String key,String value){
        this.key=key;
        this.value=value;
    }
}
