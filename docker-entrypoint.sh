#!/bin/bash

set -e

if [ "$1" = "dev" ]; then
    rm -rf dist
    yarn start:dev
else
    yarn typeorm:cli schema:sync
    yarn start
fi
