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
     *for example illegalCharFilter(string,"{,:,(,\\,")
    */
    public static String illegalCharFilter (String result,String filterChars){
        String[] strToReplace = filterChars.split(",");

        for(int i=0;i<strToReplace.length;i++){
            if(result.contains(strToReplace[i])){

                if(strToReplace[i].equals("{{")) {
                    result = result.replace(strToReplace[i], "{");
                }
                if(strToReplace[i].equals("}}")) {
                    result = result.replace(strToReplace[i], "}");
                }

            }
        }

        return result;
    }
}
