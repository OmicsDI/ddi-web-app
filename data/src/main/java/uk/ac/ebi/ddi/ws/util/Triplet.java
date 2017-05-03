package uk.ac.ebi.ddi.ws.util;


import java.io.Serializable;

/**
 * Triplet stores three elements.
 * The order of key1 and key2 has no difference in hashcode
 *
 * @author mbai
 */
public class Triplet<K1,K2,V> implements Serializable {
    private K1 key1;
    private K2 key2;
    private V value;

    public Triplet(K1 key1,K2 key2, V value) {
        this.key1 = key1;
        this.key2 = key2;
        this.value = value;
    }

    public K1 getKey1() {
        return key1;
    }

    public K2 getKey2() {
        return key2;
    }
    public void setKey1(K1 key1) {
        this.key1 = key1;
    }
    public void setKey2(K2 key2) {
        this.key2 = key2;
    }

    public V getValue() {
        return value;
    }

    public void setValue(V value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Triplet)) return false;

        Triplet triplet = (Triplet) o;

//        return !(key1 != null ? !key1.equals(tuple.key1) : tuple.key1 != null) && !(key2 != null ? !key2.equals(tuple.key2) : tuple.key2 != null) && !(value != null ? !value.equals(tuple.value) : tuple.value != null);

        //the order of key1 and key2 has no difference
        return (this.hashCode() == triplet.hashCode());

    }

    @Override
    public int hashCode() {
        int result = key1 != null ? key1.hashCode() : 0;
        result = result + (key2 != null ? key2.hashCode() : 0);  //the order of key1 and key2 has no difference
        result = 31 * result + (value != null ? value.hashCode() : 0);
        return result;
    }
}