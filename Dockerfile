FROM tomcat:9

#################################################################
# Dockerfile
#
# Version:          1
# Software:         ddi-web-app
# Software Version: 2015020
# Description:      Omics Discovery Index Web App
# Website:          http://www.omicsdi.org/
# Tags:             Proteomics, Genomics, Proteomics, Multi-Omics
# Provides:         ddi-web-app 1.0
# Base Image:       tomcat:9 
# Build Cmd:        docker build biocontainers/ddi-web-app .
# Pull Cmd:         docker pull biocotnainers/ddi-web-app
# Run Cmd:          docker run -p 8080:8080 biocontainers/ddi-web-app
# Extra:            Omicsdi Web app help you to create a web interface for your institute with omics datasets
# Extra:            Please contact omicsdi-support@ebi.ac.uk for help 
#################################################################

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

