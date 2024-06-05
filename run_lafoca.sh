#!/bin/bash

# Navega até o diretório do projeto
cd ~/Documentos/projetos/lafoca-backend/target

# Executa o comando java com os parâmetros desejados

java -jar lafoca-backend-1.0.0.jar \
--lafoca.storage.tipo-storage=$LAFOCA_STORAGE_TIPO_STORAGE \
--lafoca.storage.s3.chave-acesso-secreta=$LAFOCA_STORAGE_S3_CHAVE_ACESSO_SECRETA \
--lafoca.storage.s3.id-chave-acesso=$LAFOCA_STORAGE_S3_ID_CHAVE_ACESSO \
--default.admin.user.email=$DEFAULT_ADMIN_USER_EMAIL \
--default.admin.user.name=$DEFAULT_ADMIN_USER_NAME \
--default.admin.user.password=$DEFAULT_ADMIN_USER_PASSWORD \
--lafoca.mail.sender=$LAFOCA_MAIL_SENDER \
--spring.mail.host=$SPRING_MAIL_HOST \
--spring.mail.password=$SPRING_MAIL_PASSWORD \
--spring.mail.port=$SPRING_MAIL_PORT
