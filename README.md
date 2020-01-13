# CIELO PHP Coding Challenge
This repo contains a modern web app.
The app follows the **Separation of concerns** software architecture design pattern.
The app is made in ReactJS (client side) and a Codeigniter API (serverside).

# Video
https://youtu.be/FP3KICYV69k

# Orchestration
Docker will take care of all provisioning, installation and configuration for you.
Docker will create the DB Schema as well as populating the database.

The default docker images in used are:

For PHP

 - [https://hub.docker.com/_/php](https://hub.docker.com/_/php)

For MySQL

 - [https://hub.docker.com/_/mysql](https://hub.docker.com/_/mysql)

## Requirements
Install docker (if you don't have it).
```
    $ sudo apt-get update
```
```
	$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```
## Setup
 1. Clone repo this repo:
```
   $ git clone git@github.com:mescalito/cielo.git
```
 2. Run inside repo folder:
```
    $ docker-compose up
```
## App URL
You are good to go. Open your browser and navigate to:
 - [http://127.0.0.1:8000](http://127.0.0.1:8000)
## Relevant files
**./docker-compose.yml**
```
version: '3.3'
services:
  db:
    build:
      context: ./my-mysql-scripts
      dockerfile: Dockerfile 
    container_name: mysql8
    image: mysql:latest
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: test_db
      MYSQL_USER: devuser
      MYSQL_PASSWORD: devpass
    ports:
      - 3306:3306
  web:
    build:
      context: ./php
      dockerfile: Dockerfile 
    container_name: php74
    depends_on: 
      - db
    volumes:
      - ./php:/var/www/html/
    ports: 
      - 8000:80
```
**./my-mysql-scripts/Dockerfile**
```
FROM mysql
COPY ./db_dump.sql /docker-entrypoint-initdb.d/
```
**./php/Dockerfile**
```
FROM php:7.4-apache
RUN apt-get update && apt-get upgrade -y && apt-get install -y nano
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli \
    && a2enmod headers \
    && sed -ri -e 's/^([ \t]*)(<\/VirtualHost>)/\1\tHeader set Access-Control-Allow-Origin "*"\n\1\2/g' /etc/apache2/sites-available/*.conf
ENV TERM xterm
EXPOSE 80
```
# Clientside: React app
For the courious. Clientside App is located inside the repo in:
```
    ./php/react_app/
```
Run **webpack-dev-server** command with
```
    $ npm start
```
Open your browser
- [http://127.0.0.1:8080](http://127.0.0.1:8080)


Run **webpack** command with
```
    $ npm build
```
Run **cross-env NODE_ENV=production webpack** command with
```
    $ npm prod
```
Distribution path:
```
    /home/qqq/code/docker/php/react_app/dist
```
## UI
simple, powerful and pretty modern web apps.
![enter image description here](https://lh6.googleusercontent.com/nqQXo58SDk2NVLoWmhXczW4SQoUaDzTVrWMQgshhOouGIVF6XbqUYSNp5_lHCMj-MXrG2H6Wls7BWg=w2425-h1353-rw)
