#!/bin/sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)";
DOCKER_DIR=$(dirname "${SCRIPT_DIR}");
PROJ_DIR=$(dirname "${DOCKER_DIR}");
API_DIR="${PROJ_DIR}/api";

#docker run -it --rm \
#    --entrypoint "" \
#    --name api-provision \
#    -v "${API_DIR}:/var/www" \
#    -w /var/www \
#    ghcr.io/st-mark-reformed/smrc-2025-api sh -c "composer install";
