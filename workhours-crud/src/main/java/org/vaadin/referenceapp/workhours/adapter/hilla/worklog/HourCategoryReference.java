package org.vaadin.referenceapp.workhours.adapter.hilla.worklog;

import org.vaadin.referenceapp.workhours.domain.model.HourCategory;

public record HourCategoryReference(
        long id,
        String name
) {

    static HourCategoryReference fromEntity(HourCategory hourCategory) {
        return new HourCategoryReference(hourCategory.nullSafeId(), hourCategory.getName());
    }
}
