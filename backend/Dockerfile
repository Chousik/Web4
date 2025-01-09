FROM tomee:10-jre17-webprofile

COPY build/libs/api.war /usr/local/tomee/webapps/

EXPOSE 8080

CMD ["catalina.sh", "run"]