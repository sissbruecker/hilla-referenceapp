package org.vaadin.referenceapp.workhours.domain.primitives.jpa;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.vaadin.referenceapp.workhours.domain.primitives.EmailAddress;

/**
 * JPA AttributeConverter for {@link EmailAddress}.
 */
@Converter
public class EmailAddressAttributeConverter implements AttributeConverter<EmailAddress, String> {

    @Override
    public String convertToDatabaseColumn(EmailAddress attribute) {
        return attribute == null ? null : attribute.toString();
    }

    @Override
    public EmailAddress convertToEntityAttribute(String dbData) {
        return dbData == null ? null : EmailAddress.fromString(dbData);
    }
}
