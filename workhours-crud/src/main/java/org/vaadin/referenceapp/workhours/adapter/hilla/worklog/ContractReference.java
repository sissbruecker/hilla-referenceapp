package org.vaadin.referenceapp.workhours.adapter.hilla.worklog;

import org.vaadin.referenceapp.workhours.domain.model.Contract;

public record ContractReference(
        Long id,
        String name
) {

    static ContractReference fromEntity(Contract entity) {
        return new ContractReference(entity.nullSafeId(), entity.getName());
    }
}
