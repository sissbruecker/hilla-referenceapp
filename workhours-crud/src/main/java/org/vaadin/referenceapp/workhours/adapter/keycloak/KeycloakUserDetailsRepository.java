package org.vaadin.referenceapp.workhours.adapter.keycloak;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.UserRepresentation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.vaadin.referenceapp.workhours.domain.model.identity.UserDetails;
import org.vaadin.referenceapp.workhours.domain.model.identity.UserDetailsRepository;
import org.vaadin.referenceapp.workhours.domain.primitives.EmailAddress;
import org.vaadin.referenceapp.workhours.domain.primitives.UserId;

import javax.ws.rs.NotFoundException;
import java.net.URI;
import java.util.Collections;
import java.util.Optional;

/**
 * Implementation of {@link UserDetailsRepository} that uses Keycloak as the source of user details.
 */
class KeycloakUserDetailsRepository implements UserDetailsRepository {
    private static final Logger log = LoggerFactory.getLogger(KeycloakUserDetailsRepository.class);
    private final Keycloak keycloak;
    private final String realm;

    KeycloakUserDetailsRepository(Keycloak keycloak, String realm) {
        this.keycloak = keycloak;
        this.realm = realm;
    }

    @Override
    public Optional<UserDetails> findByUserId(UserId userId) {
        var resource = keycloak.realm(realm).users().get(userId.toString());
        try {
            return Optional.of(toUserDetails(resource.toRepresentation()));
        } catch (NotFoundException ex) {
            return Optional.empty();
        } catch (IllegalArgumentException ex) {
            log.warn("It appears user {} contains invalid data", userId);
            return Optional.empty();
        }
    }

    private UserDetails toUserDetails(UserRepresentation user) {
        return new UserDetails(
                UserId.fromString(user.getId()),
                user.getUsername(),
                user.getFirstName(),
                user.getLastName(),
                Optional.ofNullable(user.getAttributes())
                        .map(attributes -> attributes.get("picture"))
                        .orElse(Collections.emptyList())
                        .stream()
                        .findFirst()
                        .map(URI::create)
                        .orElse(null),
                Optional.ofNullable(user.getEmail())
                        .map(EmailAddress::fromString)
                        .orElse(null)
        );
    }
}
