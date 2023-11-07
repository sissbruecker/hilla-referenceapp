package org.vaadin.referenceapp.workhours.domain.base;

import org.springframework.lang.Nullable;

import java.io.Serializable;
import java.util.Optional;

public interface IdentifiableDomainObject<ID extends Serializable> {

    @Nullable
    ID id();

    default ID nullSafeId() {
        return Optional.ofNullable(id()).orElseThrow(() -> new IllegalStateException("Domain object has no ID"));
    }
}
