FROM wyveo/nginx-php-fpm
WORKDIR /usr/share/nginx/
RUN rm -rf /usr/share/nginx/html
COPY . /usr/share/nginx/