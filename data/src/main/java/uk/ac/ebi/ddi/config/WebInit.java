package uk.ac.ebi.ddi.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

/**
 * Created by user on 3/16/2017.
 */
@Configuration
public class WebInit extends AbstractAnnotationConfigDispatcherServletInitializer {

    protected Class<?>[] getRootConfigClasses() {
        return new Class<?>[]{uk.ac.ebi.ddi.config.RootConfig.class};
    }

    protected Class<?>[] getServletConfigClasses() {
        return new Class<?>[]{uk.ac.ebi.ddi.config.WebConfig.class};
    }

    protected String[] getServletMappings() {
        return new String[]{"/"};
    }
}
