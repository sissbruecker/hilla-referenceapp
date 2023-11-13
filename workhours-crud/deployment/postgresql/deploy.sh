#!/usr/bin/env bash

BASEDIR=$(dirname "$BASH_SOURCE")
mkdir -p "$BASEDIR"/data
docker run --publish 5432:5432 --mount type=bind,source="$BASEDIR"/data,target=/var/lib/postgresql/data --rm -it "$(docker build -q "$BASEDIR")"
