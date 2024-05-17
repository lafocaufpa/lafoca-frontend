# Use a imagem base oficial do Node.js
FROM node:20

# Crie e defina o diretório de trabalho no contêiner
RUN mkdir /lafoca-frontend
WORKDIR /lafoca-frontend

# Copie o arquivo .env do sistema local (host) para o diretório de trabalho do contêiner definido com WORKDIR
#LAFOCA-FRONTEND <-> image/lafoca-frontend/.env
COPY .env .env

# Defina o argumento para a porta durante o build
ARG PORT_BUILD=3000

# Defina a variável de ambiente para a porta
ENV PORT=${PORT_BUILD}

# Exponha a porta que a aplicação irá rodar
EXPOSE ${PORT_BUILD}

# Copie todos os arquivos do projeto para o diretório de trabalho no contêiner
# Primeiro ponto (.) -> refere-se ao diretório de contexto de build local
# Segundo ponto (.) -> refere-se ao diretório de trabalho no contêiner (/lafoca-frontend)
COPY . .

# Instale as dependências do projeto
RUN npm install

# Comando para rodar a aplicação
ENTRYPOINT ["npm", "run", "dev"]