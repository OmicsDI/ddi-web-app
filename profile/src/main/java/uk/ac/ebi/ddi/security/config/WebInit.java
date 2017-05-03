package uk.ac.ebi.ddi.security.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;
import uk.ac.ebi.ddi.security.component.TokenAuthenticationFilter;
import uk.ac.ebi.ddi.security.service.TokenAuthenticationService;

import javax.servlet.Filter;

/**
 * Created by user on 3/16/2017.
 * 配置DispatcherServlet 搭建Springmvc
 */
@Configuration
public class WebInit extends AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class<?>[]{uk.ac.ebi.ddi.security.config.RootConfig.class};
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class<?>[]{uk.ac.ebi.ddi.security.config.WebConfig.class
                              ,uk.ac.ebi.ddi.security.config.SecurityConfig.class
                              ,uk.ac.ebi.ddi.security.config.SocialConfig.class
                              ,uk.ac.ebi.ddi.security.config.MongoConfig.class};
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    /*
    @Override
    protected Filter[] getServletFilters() {
        return new Filter[]{new TokenAuthenticationFilter()};
    }*/
}
