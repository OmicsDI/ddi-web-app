![](https://travis-ci.org/PRIDE-Cluster/cluster-web-app.svg?branch=master)

Omics Discovery Index web-app
=====================

##Prerequisite

`Tomcat 8.5.5`
`jdk    1.8`
`Apache Maven 3.3.9`


A web application for the *Omics Discovery Index* resource. We use mostly [`AngularJS`](https://angularjs.org/) as
a front-end framework for a *Spring MVC* container-based web jsp app. For visualisation [NVD3](https://github.com/novus/nvd3) and
[Angularjs-nvd3-directives](http://cmaurer.github.io/angularjs-nvd3-directives/) are used.

In-dev prototype deployed here: [http://wwwdev.ebi.ac.uk/ddi](http://wwwdev.ebi.ac.uk/ddi).

### Project structure

The web application code is contained within the `src/main/webapp` folder. The structure is as follows:

**`/WEB-INF/views`**

Defines main views , as well as jsp files for templating and data binding.

**`/static/`**

Defines source files we need: `css/` `images/` `js/`

## Services

`DDIService`

Provides methods to query the *DDI web services* web-service at the `datasetsummary`  and `datasetdetail` end points.

##Back-end Spring MVC

Defines the routing and pre-render meta tags and ld+json to be SEO friendly.They are defined in the `org/omicsdi/springmvc` folder.

**`configuration/`**

Defines basic config for Spring MVC.

**`controller/`**

Defines the corresponding pages and controll the render logic.

**`http/`**

Defines the request class.

### Install Dependencies

After cloning the repository，you only need to install the java dependencies by Maven(download from here[`Maven`](http://maven.apache.org/download.cgi)), after that our application is packaged inside the new `target/ddi-web-app` folder:

**`mvn clean && mvn install`**

### Run the Application

We have pre-configured the project with a simple development web server.  The simplest way to start
this server is(assuming that you are in the root of application and started the Tomcat[`Tomcat`](http://tomcat.apache.org/download-80.cgi)):

```
cp -r target/ddi-web-app/* /path/to/Tomcat/webapps/ROOT/
```

Now browse to the app at `http://localhost:8000/`.



