

FROM node:10-alpine as build

ARG backend_host=/api
ENV VUE_APP_BACKEND_HOST=${backend_host}

WORKDIR /app
COPY src src
COPY public public
ADD package.json package-lock.json vue.config.js tsconfig.json babel.config.js ./

RUN npm install && npm run build


FROM nginx as run


ADD nginx.conf /etc/nginx/
COPY --from=build /app/dist /usr/share/nginx/html/

EXPOSE 80