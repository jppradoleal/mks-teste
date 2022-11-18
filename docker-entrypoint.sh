#!/bin/bash

set -e

if [ "$1" = "dev" ]; then
    yarn start:dev
else
    yarn start
fi
