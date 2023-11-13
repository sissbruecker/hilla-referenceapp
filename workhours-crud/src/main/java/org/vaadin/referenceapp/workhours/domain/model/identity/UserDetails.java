package org.vaadin.referenceapp.workhours.domain.model.identity;

import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;
import org.vaadin.referenceapp.workhours.domain.base.IdentifiableDomainObject;
import org.vaadin.referenceapp.workhours.domain.primitives.EmailAddress;
import org.vaadin.referenceapp.workhours.domain.primitives.UserId;

import java.net.URI;
import java.util.Objects;
import java.util.Optional;

import static java.util.Objects.requireNonNull;

public final class UserDetails implements IdentifiableDomainObject<UserId> {

    private final UserId id;
    private final String username;
    private final String firstName;
    private final String lastName;
    private final URI picture;
    private final EmailAddress email;

    public UserDetails(UserId id,
                       String username,
                       @Nullable String firstName,
                       @Nullable String lastName,
                       @Nullable URI picture,
                       @Nullable EmailAddress email) {
        this.id = requireNonNull(id);
        this.username = requireNonNull(username);
        this.firstName = firstName;
        this.lastName = lastName;
        this.picture = picture;
        this.email = email;
    }

    @Override
    public UserId id() {
        return id;
    }

    public String username() {
        return username;
    }

    public String firstName() {
        return firstName;
    }

    public String lastName() {
        return lastName;
    }

    public String displayName() {
        var sb = new StringBuilder();
        if (!StringUtils.isEmpty(firstName)) {
            sb.append(firstName);
        }
        if (!StringUtils.isEmpty(lastName)) {
            if (!sb.isEmpty()) {
                sb.append(" ");
            }
            sb.append(lastName);
        }
        if (sb.isEmpty()) {
            sb.append(username);
        }
        return sb.toString();
    }

    public Optional<URI> picture() {
        return Optional.ofNullable(picture);
    }

    public Optional<EmailAddress> email() {
        return Optional.ofNullable(email);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserDetails that = (UserDetails) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
