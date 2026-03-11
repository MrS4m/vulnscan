# Imagem base com Node.js (Ambiente adequando para TypeScript backend)
FROM node:20-slim

# Instalar dependências do sistema (incluindo nmap e ncat exigidos pela arquitetura)
RUN apt-get update && apt-get install -y \
    nmap \
    ncat \
    && rm -rf /var/lib/apt/lists/*

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json primeiro (para cache de camadas eficiente)
COPY package*.json ./

# Instalar dependências Node.js
RUN npm install

# Copiar restante do código da aplicação
COPY . .

# Construir a aplicação TypeScript para JavaScript
RUN npm run build

# Expor porta da API
EXPOSE 3000

# Comando para iniciar o servidor backend
CMD ["node", "dist/server.js"]
