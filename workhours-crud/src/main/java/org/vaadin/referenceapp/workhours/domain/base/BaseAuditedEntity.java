package org.vaadin.referenceapp.workhours.domain.base;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.vaadin.referenceapp.workhours.domain.primitives.UserId;
import org.vaadin.referenceapp.workhours.domain.primitives.jpa.UserIdAttributeConverter;

import java.io.Serializable;
import java.time.Instant;
import java.util.Optional;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseAuditedEntity<ID extends Serializable> extends BaseEntity<ID> {

    @CreatedDate
    @Column(name = "created_on")
    private Instant createdOn;
    @CreatedBy
    @Column(name = "created_by", length = UserId.MAX_LENGTH)
    @Convert(converter = UserIdAttributeConverter.class)
    private UserId createdBy;
    @LastModifiedDate
    @Column(name = "modified_on")
    private Instant modifiedOn;
    @LastModifiedBy
    @Column(name = "modified_by", length = UserId.MAX_LENGTH)
    @Convert(converter = UserIdAttributeConverter.class)
    private UserId modifiedBy;

    public Optional<Instant> getCreatedOn() {
        return Optional.ofNullable(createdOn);
    }

    public Optional<UserId> getCreatedBy() {
        return Optional.ofNullable(createdBy);
    }

    public Optional<Instant> getModifiedOn() {
        return Optional.ofNullable(modifiedOn);
    }

    public Optional<UserId> getModifiedBy() {
        return Optional.ofNullable(modifiedBy);
    }
}
