# Development Certificates

It goes without saying that you should never ever check in keys and credentials to source control like this.
These keys are intended to be used for development only *on your local machines*.

This directory contains the following files:

- *devCA.key* - the private CA key (pass phrase: `1bb2f4416d2e9acc85b3b38bbd5c740d`)
- *devCA.pem* - the root CA certificate
- *devCA.srl* - the serial number file for the CA
- *keycloak.localhost.crt* - the certificate for Keycloak
- *keycloak.localhost.key* - the private key for Keycloak
- *keycloak.localhost.p12* - the P12 keystore for Keycloak (pass phrase: `8b2582a72ab63061b8ae516f2b7048d1`)
- *truststore.p12* - a P12 keystore containing only the public CA certificate (pass
  phrase: `65f620b3fee2ef49457de721317d2e02`)
- *workhours.localhost.crt* - the certificate for the Workhours application
- *workhours.localhost.key* - the private key for the Workhours application
- *workhours.localhost.p12* - the P12 keystore for the Workhours application (pass
  phrase: `ac9a535af62efec084fb9b239dbf6774`)

Commands for generating and signing new certificates:

1. Create a new private key: `$ openssl genrsa -out MYAPP.key 2048`
2. Create a new CSR: `$ openssl req -new -key MYAPP.key -out MYAPP.csr`
3. Create a new
   certificate: `$ openssl x509 -req -in MYAPP.csr -CA devCA.pem -CAkey devCA.key -CAcreateserial -out MYAPP.crt -days 365 -sha256`
4. Generate a PKCS#12
   keystore: `$ openssl pkcs12 -export -out MYAPP.p12 -inkey MYAPP.key -in MYAPP.crt -certfile devCA.pem`
