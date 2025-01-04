FROM php:8.4.1-fpm-bullseye AS application

ARG TARGETARCH

# Set our workdir
WORKDIR /var/www

# s6 overlay init and process supervisor
ARG S6_VERSION=v1.22.1.0
ENV S6_BEHAVIOUR_IF_STAGE2_FAILS=2
RUN case "${TARGETARCH}" in \
        "amd64")  S6_ARCH=amd64  ;; \
        "arm64")  S6_ARCH=aarch64  ;; \
    esac \
    && curl https://github.com/just-containers/s6-overlay/releases/download/"${S6_VERSION}"/s6-overlay-"${S6_ARCH}".tar.gz -L -s --output /tmp/s6-overlay-"${S6_ARCH}".tar.gz \
    && tar xvfz /tmp/s6-overlay-"${S6_ARCH}".tar.gz -C / && rm /tmp/s6-overlay-"${S6_ARCH}".tar.gz

# Install required packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    gnupg \
    zip \
    unzip \
    libonig-dev \
    libssl-dev \
    libzip-dev \
    openssl \
    libcurl4 \
    libcurl4-openssl-dev \
    vim \
    libfreetype6-dev \
    libjpeg-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libwebp-dev \
    libxpm-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Additional PHP extensions and configuration
RUN docker-php-ext-configure gd --with-jpeg --with-freetype --with-xpm --with-webp \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-install mbstring \
    && docker-php-ext-install opcache \
    && docker-php-ext-install zip \
    && docker-php-ext-install pcntl \
    && docker-php-ext-install pdo_mysql \
    && docker-php-ext-install bcmath \
    && pecl install redis \
    && docker-php-ext-enable redis

#
# Install and configure nginx
#

# Find at http://nginx.org/packages/mainline/debian/pool/nginx/n/nginx/
# and http://nginx.org/packages/mainline/debian/pool/nginx/n/nginx-module-njs/
ARG NGINX_VERSION=1.21.4
ARG NJS_VERSION=0.7.0
ARG PKG_RELEASE=1~bullseye

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62 \
    && echo "deb http://nginx.org/packages/mainline/debian/ bullseye nginx" >> /etc/apt/sources.list \
    && apt-get update && apt-get install -y --no-install-recommends --no-install-suggests \
        ca-certificates=20210119 \
        nginx=${NGINX_VERSION}-${PKG_RELEASE} \
        nginx-module-xslt=${NGINX_VERSION}-${PKG_RELEASE} \
        nginx-module-geoip=${NGINX_VERSION}-${PKG_RELEASE} \
        nginx-module-image-filter=${NGINX_VERSION}-${PKG_RELEASE} \
        nginx-module-perl=${NGINX_VERSION}-${PKG_RELEASE} \
        nginx-module-njs=${NGINX_VERSION}+${NJS_VERSION}-${PKG_RELEASE} \
        gettext-base=0.21-4 \
    # Cleanup
    && rm -rf /var/lib/apt/lists/*

# Send logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80

# Add composer
# hadolint ignore=DL3022
COPY --from=composer:2.8.3 /usr/bin/composer /usr/bin/composer

# Standard production config
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# Custom php config
COPY docker/api/php/php-fpm.conf /usr/local/etc/php-fpm.d/zzz-custom.conf
COPY docker/api/php/php.ini $PHP_INI_DIR/conf.d/

# Install xdebug
RUN pecl install xdebug-3.4.0
COPY docker/api/php/xdebug.ini $PHP_INI_DIR/disabled/

# Custom nginx config
COPY docker/api/nginx /etc/nginx/imported
RUN cp /etc/nginx/imported/nginx.conf /etc/nginx/nginx.conf \
    && cp /etc/nginx/imported/default.conf /etc/nginx/conf.d/default.conf

# Allow composer to run as root
ENV COMPOSER_ALLOW_SUPERUSER=1

# Container configuration
COPY docker/api/cont-init.d /etc/cont-init.d/
COPY docker/api/services.d /etc/services.d/

# Update bash profile
COPY ./docker/.profile /root/.profile
COPY ./docker/.profile /root/.bashrc

# Copy the application into the container
COPY api /var/www

# Install composer dependencies
RUN composer install --no-interaction --no-ansi --no-progress --optimize-autoloader --no-dev

HEALTHCHECK --interval=5s --timeout=5s --start-period=10s --retries=10 CMD curl --fail http://localhost/healthcheck/659f105793f58 || exit 1

ENTRYPOINT ["/init"]
