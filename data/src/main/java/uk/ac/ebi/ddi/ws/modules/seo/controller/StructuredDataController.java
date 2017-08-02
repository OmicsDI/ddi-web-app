package uk.ac.ebi.ddi.ws.modules.seo.controller;

import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import uk.ac.ebi.ddi.service.db.model.dataset.Dataset;
import uk.ac.ebi.ddi.service.db.service.dataset.IDatasetService;
import uk.ac.ebi.ddi.ws.modules.dataset.model.OmicsDataset;
import uk.ac.ebi.ddi.ws.modules.seo.model.*;
import uk.ac.ebi.ddi.ws.util.Constants;

/**
 * Created by azorin on 28/07/2017.
 */

@Api(value = "seo", description = "Retrieve SEO data", position = 0)
@Controller
@RequestMapping(value = "/seo")
public class StructuredDataController {
    @Autowired
    IDatasetService datasetService;


    /******* about ****************************************************
     "@context": "http://schema.org",
     "@type": "AboutPage",
     "name": "About OmicsDI",
     "url": "http://www.omicsdi.org/about",
     "description" : "OmicsDI is a integrate resource to multiple omics repositories, including Proteomics, Metabolomics and Genomics",
     "primaryImageOfPage" : {
     "@type" : "ImageObject",
                "author" : "OmicsDI Consortium",
                "contentLocation" : "Cambridge, UK",
                "contentUrl" : "http://www.omicsdi.org/static/images/logo/about.png"
     },
     "keywords" : "OmicsDI About Page, Help, Consortium"
     ***************************************************************/
    @ApiOperation(value = "Retrieve JSON+LD for about page", position = 1, notes = "Retrieve data for about page")
    @RequestMapping(value = "/about", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK) // 200
    public @ResponseBody
    StructuredData getStructuredDataAbout()
    {
        StructuredData data = new StructuredData();

        data.setType("AboutPage");
        data.setContext("http://schema.org");
        data.setName("About OmicsDI");
        data.setUrl("http://www.omicsdi.org/about");
        data.setDescription("OmicsDI is a integrate resource to multiple omics repositories, including Proteomics, Metabolomics and Genomics");
        data.setKeywords("OmicsDI About Page, Help, Consortium");

        StructuredDataImage image = new StructuredDataImage();
        image.setType("ImageObject");
        image.setAuthor("OmicsDI Consortium");
        image.setContentLocation("Cambridge, UK");
        image.setContentUrl("http://www.omicsdi.org/static/images/logo/about.png");

        data.setPrimaryImageOfPage(image);

        return data;
    }

    /******* api ****************************************************
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "API",
    "url": "http://www.omicsdi.org/api",
    "description" : "OmicsDI API Home Page to programmatically access to OmicsDI Datasets",
    "image": "http://www.omicsdi.org/static/images/logo/api.png",
    "keywords" : "OmicsDI About Page, Help, Consortium"
     ***************************************************************/
    @ApiOperation(value = "Retrieve JSON+LD for api page", position = 1, notes = "Retrieve data for api page")
    @RequestMapping(value = "/api", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK) // 200
    public @ResponseBody
    StructuredData getStructuredDataApi()
    {
        StructuredData data = new StructuredData();

        data.setType("WebPage");
        data.setContext("http://schema.org");
        data.setName("API");
        data.setUrl("http://www.omicsdi.org/api");
        data.setDescription("OmicsDI API Home Page to programmatically access to OmicsDI Datasets");
        data.setKeywords("OmicsDI About Page, Help, Consortium");

        return data;
    }

    /******* search ****************************************************
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Browse",
    "url": "http://www.omicsdi.org/search?q=*:*",
    "description" : "Browse and Search for OmicsDI Datasests",
    "image": "http://www.omicsdi.org/static/images/logo/search.png",
    "keywords" : "OmicsDI, Search, Browsers, Datasets, Searching"
    ***************************************************************/
    @ApiOperation(value = "Retrieve JSON+LD for browse page", position = 1, notes = "Retrieve data for browse page")
    @RequestMapping(value = "/search", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK) // 200
    public @ResponseBody
    StructuredData getStructuredDataBrowse()
    {
        StructuredData data = new StructuredData();

        data.setType("WebPage");
        data.setContext("http://schema.org");
        data.setName("Browse");
        data.setUrl("http://www.omicsdi.org/search?q=*:*");
        data.setDescription("Browse and Search for OmicsDI Datasests");
        data.setKeywords("OmicsDI, Search, Browsers, Datasets, Searching");

        return data;
    }

    /******* database ****************************************************
     "@context": "http://schema.org",
     "@type": "WebPage",
     "name": "Databases",
     "url": "http://www.omicsdi.org/databases",
     "description" : "Databases and Providers",
     "image": "http://www.omicsdi.org/static/images/logo/help.png",
     "keywords" : "OmicsDI Help Page, Training, Examples"
     ***************************************************************/
    @ApiOperation(value = "Retrieve JSON+LD for databases page", position = 1, notes = "Retrieve data for databases page")
    @RequestMapping(value = "/database", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK) // 200
    public @ResponseBody
    StructuredData getStructuredDataDatabase()
    {
        StructuredData data = new StructuredData();

        data.setType("WebPage");
        data.setContext("http://schema.org");
        data.setName("Databases");
        data.setUrl("http://www.omicsdi.org/database");
        data.setDescription("Databases and Providers");
        data.setKeywords("OmicsDI Help Page, Training, Examples");

        return data;
    }

    /******* dataset ****************************************************
     "@context": "http://schema.org",
     "@type": "Dataset",
     <c:if test="${!name.equals(\"\")}">"name": "${name}",</c:if>
     <c:if test="${!meta_dataset_abstract.equals(\"\")}">"description": "${meta_dataset_abstract}",</c:if>
     <c:if test="${!meta_originalURL.equals(\"\")}">"sameAs": "${meta_originalURL}",</c:if>
     <c:if test="${!keywords.equals(\"\")}">"keywords": "${keywords}",</c:if>
     <c:if test="${!omics_type.equals(\"\")}">"variableMeasured": ${omics_type},</c:if>
     <c:if test="${!(all_authors.isEmpty() && all_authors.equals(\"[]\"))}">
     "creator": [{"@type" : "Person",
                  "name" : ${all_authors}}
                <c:if test="${!organization.isEmpty()}">,{"@type":"Organization",
                                                          "name":${organization}
     }</c:if>],
     </c:if>
     <c:if test="${!submitter.isEmpty()}">
        "citation": {"@type":"CreativeWork",
                    "author":{  "@type":"Person",
                                "name":${submitter}},
                    "publisher": {  "@type":"Organization",
                                    "name":"${datasetDomain.toUpperCase()}"},
                    "name":"${name}",
                    "url":"${meta_ddiURL}"
                    },
     </c:if>
     "url": "${meta_ddiURL}"
     ***************************************************************/
    @ApiOperation(value = "Retrieve JSON+LD for dataset page", position = 1, notes = "Retrieve data for dataset page")
    @RequestMapping(value = "/dataset/{domain}/{acc}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK) // 200
    public @ResponseBody
    StructuredData getStructuredDataDataset(@ApiParam(value = "Accession of the Dataset in the resource, e.g : PXD000210")
                                            @PathVariable(value = "acc") String acc,
                                            @ApiParam(value = "Database accession id, e.g: pride")
                                            @PathVariable(value = "domain") String domain)
    {
        StructuredData data = new StructuredData();

        String database = Constants.Database.retriveAnchorName(domain);

        Dataset dataset = datasetService.read(acc, database);

        data.setType("Dataset");
        data.setContext("http://schema.org");

        if(StringUtils.isNotEmpty(dataset.getName())){
            data.setName(dataset.getName());
        }
        if(StringUtils.isNotEmpty(dataset.getDescription())){
            data.setName(dataset.getDescription());
        }

        data.setSameAs("http://www.omicsdi.org/dataset/"+domain+"/"+acc);

        if(null!=dataset.getAdditional())
            if(null!=dataset.getAdditional().get("submitter_keywords")){
                String submitterKeywords = StringUtils.join(dataset.getAdditional().get("submitter_keywords").toArray(),",");
                data.setKeywords(submitterKeywords);
            }

        if(null!=dataset.getAdditional())
            if(null!=dataset.getAdditional().get("omics_type")){
                String omics = StringUtils.join(dataset.getAdditional().get("omics_type").toArray(),",");
                data.setVariableMeasured(omics);
            }

        if(null!=dataset.getAdditional())
            if(null!=dataset.getAdditional().get("submitter")){
                String creator = StringUtils.join(dataset.getAdditional().get("submitter").toArray(),",");

                StructuredDataAuthor person = new StructuredDataAuthor();
                person.setType("Person");
                person.setName(creator);

                //TODO: Organization
                StructuredDataAuthor[] creators = {person};

                data.setCreator(creators);

                StructuredDataAuthor publisher = new StructuredDataAuthor();
                publisher.setType("Organization");
                publisher.setName(domain.toUpperCase());

                StructuredDataCitation citation = new StructuredDataCitation();
                citation.setType("CreativeWork");
                citation.setName(dataset.getName());
                citation.setUrl("http://www.omicsdi.org/dataset/"+domain+"/"+acc);
                citation.setAuthor(person);
                citation.setPublisher(publisher);

                data.setCitation(citation);
            }

        data.setName("Databases");
        data.setUrl("http://www.omicsdi.org/database");
        data.setDescription("Databases and Providers");
        data.setKeywords("OmicsDI Help Page, Training, Examples");

        return data;
    }

    /******* home ****************************************************
     "@context": "http://schema.org",
     "keywords":"Proteomics, Genomics, Transcriptomics, Metabolomics, Multi-Omics, MultiOmics, Bioinformatics, System Biology, Datasets",
     "@type": "WebSite",
     "name" : "Omics Discovery Index - Discovering and Linking Public Omics Datasets",
     "alternateName" : "OmicsDI",
     "description": "OmicsDI is an integrated and open source platform facilitating the access and dissemination of omics datasets. OmicsDI provides a unique infrastructure to integrate datasets coming
     from multiple omics studies, including at present proteomics, genomics and metabolomics and Multi-Omics",
     "url": "http://www.omicsdi.org/",
     "image":"http://www.omicsdi.org/static/images/logo/OmicsDI-icon-3.png",
     "potentialAction": {
        "@type": "SearchAction",
                "target": "http://www.omicsdi.org/search?q={search_term_string}",
                "query-input": "required name=search_term_string"


     "@context": "http://schema.org",
     "@type": "Organization",
     "name" : "OmicsDI Consortium",
     "alternateName" : "OmicsDI Consortium",
     "description": "OmicsDI is an integrated and open source platform facilitating the access and dissemination of omics datasets. OmicsDI provides a unique infrastructure to integrate datasets coming
     from multiple omics studies, including at present proteomics, genomics and metabolomics and Multi-Omics",
     "url": "http://www.omicsdi.org/",
     "logo":"http://www.omicsdi.org/static/images/logo/OmicsDI-icon-3.png",
     "email": "omicsdi-support@ebi.ac.uk",
     "sameAs" : [ "https://github.com/BD2K-DDI",
     "https://twitter.com/OmicsDI",
     "https://plus.google.com/u/0/113645049761549550219"]
    *************************************************/
    @ApiOperation(value = "Retrieve JSON+LD for home page", position = 1, notes = "Retrieve data for home page")
    @RequestMapping(value = "/home", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK) // 200
    public @ResponseBody
    StructuredDataGraph getStructuredDataHome()
    {
        StructuredDataGraph graph = new StructuredDataGraph();

        StructuredData webSite = new StructuredData();
        webSite.setType("WebSite");
        webSite.setContext("http://schema.org");
        webSite.setName("Omics Discovery Index - Discovering and Linking Public Omics Datasets");
        webSite.setAlternateName("OmicsDI");
        webSite.setUrl("http://www.omicsdi.org/");
        webSite.setDescription("OmicsDI is an integrated and open source platform facilitating the access and dissemination of omics datasets. OmicsDI provides a unique infrastructure to integrate datasets coming\n" +
                "     from multiple omics studies, including at present proteomics, genomics and metabolomics and Multi-Omics");
        webSite.setImage("http://www.omicsdi.org/static/images/logo/OmicsDI-icon-3.png");
        webSite.setKeywords("Proteomics, Genomics, Transcriptomics, Metabolomics, Multi-Omics, MultiOmics, Bioinformatics, System Biology, Datasets");

        StructuredDataAction action = new StructuredDataAction();
        action.setType("SearchAction");
        action.setTarget("http://www.omicsdi.org/search?q={search_term_string}");
        action.setQueryInput("required name=search_term_string");

        webSite.setPotentialAction(action);


        StructuredData organization = new StructuredData();
        organization.setType("Organization");
        organization.setName("OmicsDI Consortium");
        organization.setContext("http://schema.org");
        organization.setAlternateName("OmicsDI Consortium");
        organization.setUrl("http://www.omicsdi.org/");
        organization.setDescription("OmicsDI is an integrated and open source platform facilitating the access and dissemination of omics datasets. OmicsDI provides a unique infrastructure to integrate datasets coming\n" +
                "        from multiple omics studies, including at present proteomics, genomics and metabolomics and Multi-Omics");
        organization.setLogo("http://www.omicsdi.org/static/images/logo/OmicsDI-icon-3.png");
        organization.setEmail("omicsdi-support@ebi.ac.uk");
        organization.setSameAs("https://github.com/BD2K-DDI,https://twitter.com/OmicsDI,https://plus.google.com/u/0/113645049761549550219");

        graph.setGraph(new StructuredData[]{webSite, organization});

        return graph;
    }


}