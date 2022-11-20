#!/bin/bash

set -e

if [ "$1" = "dev" ]; then
    rm -rf dist
    yarn start:dev
else
    yarn start
fi
