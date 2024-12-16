FROM ubuntu:latest
LABEL authors="chousik"

ENTRYPOINT ["top", "-b"]