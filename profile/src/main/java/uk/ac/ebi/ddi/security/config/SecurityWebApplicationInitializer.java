package uk.ac.ebi.ddi.security.config;

import org.springframework.security.web.context.*;

public class SecurityWebApplicationInitializer
        extends AbstractSecurityWebApplicationInitializer {

    public SecurityWebApplicationInitializer() {
        super(); /*SecurityConfig.class*/
    }
}