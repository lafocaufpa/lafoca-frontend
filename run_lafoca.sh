#!/bin/bash

# Navega até o diretório do projeto
cd ~/Documentos/projetos/lafoca-backend/target

# Executa o comando java com os parâmetros desejados

java -jar lafoca-backend-0.0.1-SNAPSHOT.jar --lafoca.storage.tipo-storage=$LAFOCA_STORAGE_TIPO_STORAGE --lafoca.storage.s3.chave-acesso-secreta=$LAFOCA_STORAGE_S3_CHAVE_ACESSO_SECRETA --lafoca.storage.s3.id-chave-acesso=$LAFOCA_STORAGE_S3_ID_CHAVE_ACESSO

