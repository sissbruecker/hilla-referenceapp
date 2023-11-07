package org.vaadin.referenceapp.workhours.domain.primitives.jpa;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.vaadin.referenceapp.workhours.domain.primitives.UserId;

/**
 * JPA AttributeConverter for {@link UserId}.
 */
@Converter
public class UserIdAttributeConverter implements AttributeConverter<UserId, String> {

    @Override
    public String convertToDatabaseColumn(UserId attribute) {
        return attribute == null ? null : attribute.toString();
    }

    @Override
    public UserId convertToEntityAttribute(String dbData) {
        return dbData == null ? null : UserId.fromString(dbData);
    }
}
