# Reference App - CRUD Version

This is the simplest version of the reference app, with an anemic and shallow domain model and very little business
logic. The user interface and the browser callable services have been designed to have production quality, which is why
quite a lot of attention has been paid to details.

The application is using the following technologies:

* [Hilla](https://hilla.dev/) for the user interface.
* Spring Data / JPA / Hibernate for object persistence.
* In-memory H2 database for storing the data (**will be replaced with PostgreSQL later**).
* [Keycloak](https://www.keycloak.org/) for authentication and authorization.
* [SSO Kit](https://hilla.dev/docs/react/acceleration-kits/sso-kit/getting-started) for integrating Keycloak with
  Vaadin.

## Starting Keycloak

Keycloak requires [Docker](https://docker.com) to run. The `deployment/keycloak` directory contains a script called
`deploy.sh` that will configure and start a new Keycloak instance that is accessible on port 9443 using HTTPS.

The Keycloak instance contains two users (both with the password `password123!`):

* `bill.lumbergh` - a manager
* `peter.gibbons` - an employee

The Keycloak instance also contains two clients:

* `workhours-crud-dev` - configured to talk to the reference app while running in development mode on localhost (no
  TLS).
* `workhours-crud-prod` - configured to talk to the reference app while running in production mode on localhost (TLS).

You can log into the [Keycloak administration console](https://localhost:9443/admin/) using the following credentials:

* Username: `admin`
* Password: `d0af98ed0b50ba5efb537aef3be54aaf`

Please note, that any changes you make to Keycloak will not survive a restart.

## Running the application in development mode

Even though the application has TLS support and this example project contains the necessary certificates (including a
root CA), you have to run it with TLS disabled while developing. This is because Spring Dev Tools will not work when TLS
is enabled and this in turn will affect developer productivity. By running the application with the
`dev` Spring profile activated, TLS will be disabled and the application will be available on port 8080.

You can start the application from the command line by issuing the following command:

`$ ./mvnw -Pdevelopment`

After that, you can access the application at https://localhost:8080.

**Note! Right now, there is no default
route so you have to navigate to http://localhost:8080/workhours to see the application. This will change later.**

## Running the application in production mode

To be written.