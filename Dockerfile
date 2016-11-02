FROM tomcat:9


LABEL base.image ="tomcat:9"
LABEL version="1"
LABEL software="ddi-web-app"
LABEL software.version="1"
LABEL description="Omics Discovery Index Web App"
LABEL website="http://www.omicsdi.org/"
LABEL tags="Proteomics, Genomics, Proteomics, Multi-Omics"
LABEL run="docker run -p 8080:8080 biocontainers/ddi-web-app"
LABEL extra="Omicsdi Web app help you to create a web interface for your institute with omics datasets"
LABEL extra="Please contact omicsdi-support@ebi.ac.uk for help"
LABEL license="Apache 2.0"
 
MAINTAINER "Yasset Perez-Riverol <yperez@ebi.ac.uk>"

RUN apt-get update
RUN apt-get install -y openjdk-8-jdk maven

ADD settings.xml /usr/local/tomcat/conf/
ADD tomcat-users.xml /usr/local/tomcat/conf/


WORKDIR /code

ADD pom.xml /code/pom.xml

RUN ["mvn", "dependency:resolve"]
RUN ["mvn", "verify"]

ADD src /code/src 

RUN ["mvn", "package"]

RUN rm -rf /usr/local/tomcat/webapps/* && mkdir /usr/local/tomcat/ROOT/ &&  cp -r /code/target/ddi-web-app/ /usr/local/tomcat/webapps/ROOT

