FROM nginx:1.15.2-alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY dist /usr/share/nginx/html/dist/

CMD ["nginx", "-g", "daemon off;"]
