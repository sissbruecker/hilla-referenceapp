#!/usr/bin/env bash

BASEDIR=$(dirname "$BASH_SOURCE")

cp "$BASEDIR"/../dev-certs/keycloak.localhost.p12 "$BASEDIR"

docker run --publish 9443:8443 --rm -it "$(docker build -q "$BASEDIR")"

