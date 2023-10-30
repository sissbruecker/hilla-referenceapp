package org.vaadin.referenceapp.workhours.domain.base;

import jakarta.persistence.MappedSuperclass;
import org.springframework.data.jpa.domain.AbstractPersistable;

import java.io.Serializable;
import java.util.Optional;

@MappedSuperclass
public abstract class BaseEntity<ID extends Serializable> extends AbstractPersistable<ID> {

    public ID nullSafeId() {
        return Optional.ofNullable(getId()).orElseThrow(() -> new IllegalStateException("Entity has no ID"));
    }
}
