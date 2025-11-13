FROM node:15.13-alpine as build

WORKDIR /podium-helper

COPY package.json ./package.json
COPY package-lock.json package-lock.json

RUN npm ci --production

COPY . .

RUN npm run build

# NGINX Web Server
FROM nginx:1.12-alpine as prod

COPY --from=build /podium-helper/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]