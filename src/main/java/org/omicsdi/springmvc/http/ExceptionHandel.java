package org.omicsdi.springmvc.http;

/**
 * Created by goucong on 18.10.16.
 */

/**
 * This class is used for processing some unexpected exceptions
 */
public class ExceptionHandel {

    /**
     * it is used for make some String contains illegal characters be legal
     *for example illegalCharFilter(string,"{:(\\")
    */
    public static String illegalCharFilter (String result,String filterChars){

        for(int i=0;i<filterChars.length();i++){
            if(result.contains(String.valueOf(filterChars.charAt(i)))){
                result=result.replace(String.valueOf(filterChars.charAt(i))," ");
            }
        }

        return result;
    }
}
