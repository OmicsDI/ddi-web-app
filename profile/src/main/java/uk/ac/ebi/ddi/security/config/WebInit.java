package uk.ac.ebi.ddi.security.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;
import uk.ac.ebi.ddi.security.component.TokenAuthenticationFilter;

import javax.servlet.Filter;

/**
 * Created by user on 3/16/2017.
 */
@Configuration
public class WebInit extends AbstractAnnotationConfigDispatcherServletInitializer {

    protected Class<?>[] getRootConfigClasses() {
        return new Class<?>[]{uk.ac.ebi.ddi.security.config.RootConfig.class};
    }

    protected Class<?>[] getServletConfigClasses() {
        return new Class<?>[]{uk.ac.ebi.ddi.security.config.WebConfig.class
                              ,uk.ac.ebi.ddi.security.config.SecurityConfig.class
                              ,uk.ac.ebi.ddi.security.config.SocialConfig.class};
    }

    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    @Override
    protected Filter[] getServletFilters() {
        return new Filter[]{new TokenAuthenticationFilter()};
    }
}
