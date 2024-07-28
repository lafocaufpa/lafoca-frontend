#!/bin/bash

# Carrega as variáveis de ambiente do .bashrc ou .bash_profile
source ./.env
source ~/.bashrc

# Navega até o diretório do projeto
cd ~/Documentos/projetos/lafoca-backend/target

# Executa o comando java com os parâmetros desejados

java -DDB_HOST=$DB_HOST -jar lafoca-backend-1.0.0.jar \
--spring.datasource.password=$MYSQL_ROOT_PASSWORD \
--lafoca.jwt.keystore.password=$LAFOCA_JWT_KEYSTORE_PASSWORD \
--lafoca.storage.s3.chave-acesso-secreta=$LAFOCA_STORAGE_S3_CHAVE_ACESSO_SECRETA \
--lafoca.storage.s3.id-chave-acesso=$LAFOCA_STORAGE_S3_ID_CHAVE_ACESSO \
--lafoca.storage.s3.bucket=$LAFOCA_STORAGE_S3_BUCKET \
--default.admin.user.email=$DEFAULT_ADMIN_USER_EMAIL \
--default.admin.user.name=$DEFAULT_ADMIN_USER_NAME \
--default.admin.user.password=$DEFAULT_ADMIN_USER_PASSWORD \
--lafoca.mail.sender=$LAFOCA_MAIL_SENDER \
--spring.mail.host=$SPRING_MAIL_HOST \
--spring.mail.password=$SPRING_MAIL_PASSWORD \
--spring.mail.port=$SPRING_MAIL_PORT \
--lafoca.jwt.keystore.jks-location=$LAFOCA_JWT_KEYSTORE_JKS_LOCATION \
--lafoca.jwt.keystore.keypair-alias=$LAFOCA_JWT_KEYSTORE_KEYPAIR_ALIAS \
--lafoca.database.backuppass=$LAFOCA_DATABASE_BACKUPPASS \
--lafoca.jwt.expiresAt.ofDays=$LAFOCA_JWT_EXPIRESAT_OFDAYS \
