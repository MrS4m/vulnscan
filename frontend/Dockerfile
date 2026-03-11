# Estágio de Build (React / Vite)
FROM node:20-slim AS builder

WORKDIR /app

# Argumentos de build injetados via Docker Compose
ARG VITE_API_URL
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY

# Convertendo ARGs em variáveis de ambiente de Build
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

# Instalar dependências Node.js
COPY package*.json ./
RUN npm install

# Copiar restante do código e fazer build estático
COPY . .
RUN npm run build

# Estágio de Produção (Servidor Web Nginx)
FROM nginx:alpine

# Copiar arquivos estáticos do Vite para o diretório padrão do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expor porta padrão de servidores web
EXPOSE 80

# Iniciar o Nginx em foreground
CMD ["nginx", "-g", "daemon off;"]
