package org.vaadin.referenceapp.workhours.adapter.hilla.worklog;


import dev.hilla.Nullable;
import org.vaadin.referenceapp.workhours.domain.model.WorkLogEntry;
import org.vaadin.referenceapp.workhours.domain.primitives.UserId;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;

// TODO Is there a smarter way to handle the annotations here?

// I have to mark all the fields here as @Nullable because otherwise the form will not work as expected
// on the client side. The fields are actually required, but I'm dealing with the validation manually both
// on the client and the server side.
public record WorkLogEntryFormDTO(
        @Nullable Long id,
        @Nullable Long projectId,
        @Nullable Long contractId,
        @Nullable LocalDate date,
        @Nullable LocalTime startTime,
        @Nullable LocalTime endTime,
        @Nullable String description,
        @Nullable Long hourCategoryId,
        @Nullable String createdBy,
        @Nullable Instant createdOn,
        @Nullable String modifiedBy,
        @Nullable Instant modifiedOn
) {

    static WorkLogEntryFormDTO fromEntity(WorkLogEntry entity) {
        return new WorkLogEntryFormDTO(
                entity.nullSafeId(),
                entity.getProject().nullSafeId(),
                entity.getContract().nullSafeId(),
                entity.getDate(), entity.getStartTime(),
                entity.getEndTime(),
                entity.getDescription(),
                entity.getHourCategory().nullSafeId(),
                entity.getCreatedBy().map(UserId::toString).orElse(null),
                entity.getCreatedOn().orElse(null),
                entity.getModifiedBy().map(UserId::toString).orElse(null),
                entity.getModifiedOn().orElse(null)
        );
    }
}
