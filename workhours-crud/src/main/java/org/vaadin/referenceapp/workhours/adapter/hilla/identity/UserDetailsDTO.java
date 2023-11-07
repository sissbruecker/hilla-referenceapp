package org.vaadin.referenceapp.workhours.adapter.hilla.identity;

import dev.hilla.Nullable;
import org.vaadin.referenceapp.workhours.domain.model.identity.UserDetails;
import org.vaadin.referenceapp.workhours.domain.primitives.EmailAddress;

import java.net.URI;

public record UserDetailsDTO(
        String id,
        String username,
        @Nullable String firstName,
        @Nullable String lastName,
        String displayName,
        @Nullable String picture,
        @Nullable String email
) {

    static UserDetailsDTO fromEntity(UserDetails entity) {
        return new UserDetailsDTO(
                entity.nullSafeId().toString(),
                entity.username(),
                entity.firstName(),
                entity.lastName(),
                entity.displayName(),
                entity.picture().map(URI::toString).orElse(null),
                entity.email().map(EmailAddress::toString).orElse(null)
        );
    }
}
