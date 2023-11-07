package org.vaadin.referenceapp.workhours.domain.model.identity;

import org.vaadin.referenceapp.workhours.domain.primitives.UserId;

import java.util.Optional;

public interface UserDetailsRepository {

    Optional<UserDetails> findByUserId(UserId userId);
}
