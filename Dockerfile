FROM alpine:latest
RUN apk add --no-cache nodejs npm
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 9094
ENTRYPOINT [ "npm", "run" ]
CMD [ "dev" ]