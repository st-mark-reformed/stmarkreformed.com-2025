#!/usr/bin/env bash

echo "Entering Queue Consume loop…";
while true; do
    /usr/local/bin/php /var/www/cli queue:consume-next --verbose --no-interaction;
    sleep 0.5;
done
