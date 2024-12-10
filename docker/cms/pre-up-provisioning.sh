#!/bin/sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)";
DOCKER_DIR=$(dirname "${SCRIPT_DIR}");
PROJ_DIR=$(dirname "${DOCKER_DIR}");
ROOT_DIR="${PROJ_DIR}/cms";
NEXT_DIR="${ROOT_DIR}/.next";

docker run --rm \
    --entrypoint "" \
    --env NODE_ENV=development \
    --name cms_provision \
    --mount type=bind,source="${ROOT_DIR}",target=/app \
    -w /app \
    ghcr.io/st-mark-reformed/smrc-2025-cms bash -c "pnpm install";

if [ ! -d "${NEXT_DIR}" ]; then
    echo "Running local next build...";

    docker run -it --rm \
        --entrypoint "" \
        --name cms_provision \
        --mount type=bind,source="${ROOT_DIR}",target=/app \
        -w /app \
        ghcr.io/st-mark-reformed/smrc-2025-cms bash -c "pnpm build";
else
    # shellcheck disable=SC2016
    echo 'Local next build already exists. If the web container fails, run `./dev docker container cms-node pnpm build`';
fi
