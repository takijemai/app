FROM nginx:1.17.1-alpine
COPY nginx.config /etc/nginx/nginx.config
COPY /dist  /usr/share/nginx/html


