FROM quay.io/keycloak/keycloak:latest as builder

WORKDIR /opt/keycloak
ADD realm/workhours.json /tmp
ADD keycloak.localhost.p12 conf/server.keystore

RUN ["/opt/keycloak/bin/kc.sh", "build"]
RUN ["/opt/keycloak/bin/kc.sh", "import", "--optimized", "--file", "/tmp/workhours.json"]

FROM quay.io/keycloak/keycloak:latest
COPY --from=builder /opt/keycloak/ /opt/keycloak/

ENV KEYCLOAK_ADMIN=admin
ENV KEYCLOAK_ADMIN_PASSWORD=d0af98ed0b50ba5efb537aef3be54aaf

ENTRYPOINT [ \
    "/opt/keycloak/bin/kc.sh", \
    "start", \
    "--optimized", \
    "--hostname-url=https://localhost:9443", \
    "--https-key-store-password=8b2582a72ab63061b8ae516f2b7048d1" \
]

