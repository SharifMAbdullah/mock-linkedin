# # # build stage
# # FROM node:14-alpine as build-stage

# # WORKDIR /app

# # COPY ./frontend/package*.json ./

# # COPY ./frontend .

# # RUN npm install

# # EXPOSE 5173

# # RUN npm run build

# #prod stage
# FROM nginx:1.24.0-alpine-slim as production-stage

# # WORKDIR /var/www/html
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# # COPY ./frontend/build .
# COPY --from=build-stage /app/build /usr/share/nginx/html

# CMD [ "nginx", "-g", "daemon off;" ]
FROM nginx:1.24.0-alpine-slim

WORKDIR /var/www/html

COPY ./frontend/dist .

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
