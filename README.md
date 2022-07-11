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
</ul>

## Documentação da API:
<p><code>https://app.swaggerhub.com/apis-docs/LUCAS_1/API-desafio/1.0.0#/</code></p>

## Como utilizar:

<p>1-Iniciar o Docker.</p>
<p>2-Abrir o terminal dentro da pasta do projeto e executar os seguintes comandos:</p>
<p><b>OBS:</b> Caso seu sistema operacional seja o Windows, recomendo utilizar o Cmder para que todos os comandos sejam aceitos.</p>
<p><b>Link para Download:</b> https://cmder.net/ </p>

<p>Comandos:</p>
<ul>
    <p><code>ln -s public html</code></p>
    <p><code>chmod 777 -R storage/*</code></p>
    <p><code>chmod 777 -R bootstrap/*</code></p>
    <p><code>docker-compose up -d --build</code></p>
</ul>
<p>3-Acessar o container chamado app-laravel através do comando:</p>
<ul>
    <p><code>docker exec -it app-laravel bash</code></p>
</ul>
<p>4-Em seguida, executar os comandos:</p>
<ul>
    <p><code>composer install</code></p>
    <p><code>php artisan migrate:fresh --seed</code></p>
</ul>
<p>5-Acessar o arquivo do NGINX através do comando:</p>
<ul>
    <p><code>nano /etc/nginx/conf.d/default.conf</code></p>
</ul>
<p>6-Localizar a tag "location" e dentro dela realizar a seguinte alteração:</p>
<ul>
    <p>A string em negrito "$uri/index.html" deve ser removida;</p>
    <p><code>ANTES: try_files $uri/ /index.php?$query_string <b>$uri/index.html</b>;</code></p>
    <p><code>DEPOIS: try_files $uri/ /index.php?$query_string;</code></p>
    <p>Após realizar a alteração, pressionar as teclas CTRL + O + ENTER para salvar e em seguida CTRL + X para sair.</p>
</ul>
<p>7-Reiniciar o serviço do NGINX através do comando:</p>
<ul>
    <p><code>/etc/init.d/nginx restart</code></p>
</ul>
<p>8-Neste momento o ambiente está pronto para ser utilizado e para isso, acessar a seguinte URL:</p>
<ul>
    <p><code>http://localhost:8080/api/user</code></p>
</ul>
<p>9-Utilizar o Postman ou outra plataforma para realizar os testes na API.</p>


## Recursos Utilizados:

<ul>
    <li>Laravel 8</li>
    <li>Composer</li>
    <li>Docker</li>
    <li>PHP 8</li>
    <li>MySQL 5.7</li>
    <li>NGINX</li>
    <li>Swagger API Documentation</li>
</ul>
