ARG API_IMAGE=ghcr.io/st-mark-reformed/smrc-2025-api
FROM $API_IMAGE

HEALTHCHECK NONE

ENTRYPOINT []

CMD printenv | grep -v "no_proxy" >> /etc/environment && /var/www/queueConsumer.sh
