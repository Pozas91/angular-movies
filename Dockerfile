# docker build -t angular-movies:app . && docker run -p 8080:80 --name angular-movies -t -i --rm angular-movies:app
# Proceso de compilación
FROM node:14.0.0-alpine as build-stage

# instalar un simple servidor http para servir nuestro contenido estático
RUN npm install -g @angular/cli

# hacer la carpeta 'app' el directorio de trabajo actual
WORKDIR /app

# copiar 'package.json' y 'package-lock.json' (si están disponibles)
COPY package*.json ./

# instalar dependencias del proyecto
RUN npm install

# copiar los archivos y carpetas del proyecto al directorio de trabajo actual (es decir, la carpeta 'app')
COPY . .

# construir aplicación para producción minificada
RUN ng build --prod --output-path docs --base-href /angular-movies/ --localize

# Proceso de producción
FROM nginx:1.13.12-alpine as production-stage
COPY --from=build-stage /app/docs /usr/share/nginx/html

# Copiando configuración personalizada de nginx
COPY nginx.conf /etc/nginx/nginx.conf
CMD [ "nginx", "-g", "daemon off; "]
