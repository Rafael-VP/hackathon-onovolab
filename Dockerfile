# Estágio 1: Build da aplicação React
# ATUALIZADO para a versão 22 do Node.js
FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio 2: Servir os arquivos com Nginx
FROM nginx:1.25-alpine

# ATUALIZADO de /app/build para /app/dist
# O Vite gera a pasta 'dist' por padrão
COPY --from=builder /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]