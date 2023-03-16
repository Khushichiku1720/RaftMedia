FROM amazoncorretto:11
VOLUME /tmp
ADD target/url-shortener-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["nodejs", "mongodb://0.0.0.0:27017", "-jar","/app.jar"]