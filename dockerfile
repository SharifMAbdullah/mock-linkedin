FROM nginx:1.24.0-alpine-slim

WORKDIR /var/www/html

COPY ./frontend/build .

COPY ./nginx.conf /etc/nginx/conf.d/default.conf