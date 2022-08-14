![Logo OW Interactive](https://github.com/owInteractive/desafio-backend/raw/master/media/logo.jpg "OW Interactive")

# Desafio Back-End - OW Interactive 21/22

## Sobre a OW Interactive
Fazemos parte do universo digital, focada em criar e desenvolver experiências interativas, integrando planejamento, criatividade e tecnologia.

Conheça mais sobre nós em: [OW Interactive - Quem somos](http://www.owinteractive.com/quem-somos/).

Detalhes do Desafio em: https://github.com/owInteractive/desafio-backend

## Requisitos:
Os seguintes softwares serão necessários para rodar o projeto (Windows ou Linux):
<ul>
    <li>Docker</li>
    <li>Node</li>
    <li>Npm</li>
</ul>

## Documentação da API:
https://app.swaggerhub.com/apis/LUCASGONCALVES/Desafio-OW-Interactive/1.0.0

## Como utilizar:

<p>1-Iniciar o Docker.</p>
<p>2-Abrir o terminal dentro da pasta do projeto e executar os seguintes comandos:</p>
<p><b>OBS:</b> Caso seu sistema operacional seja o Windows, recomendo utilizar o Cmder para que todos os comandos sejam aceitos.</p>
<p><b>Link para Download:</b> https://cmder.net/ </p>

<p>Comandos:</p>
<ul>
    <p><code>npm install</code></p>
    <p><code>docker-compose up -d</code></p>
    <p><code>node ace migration:run --seed</code></p>
    <p><code>npm run dev</code></p>
</ul>

<p>3-Neste momento o ambiente está pronto para ser utilizado na seguinte URL:</p>
<ul>
    <p><code>http://127.0.0.1:3333/api</code></p>
</ul>

<p>4-Utilizar o Postman para realizar os testes na API.</p>
<p><b>OBS:</b> Há um diretório na raiz do projeto chamado "Postman" que contém os arquivos de teste da API já prontos, basta apenas importá-lo e iniciar os testes.</p>

<p>5-Antes de iniciar os testes na API, é necessário que seja gerado um novo token na rota /login da autenticação.</p>

## Recursos Utilizados:

<ul>
    <li>AdonisJS 5</li>
    <li>Docker</li>
    <li>Postman</li>
    <li>MySQL 5.7</li>
    <li>Swagger API Documentation</li>
</ul>
