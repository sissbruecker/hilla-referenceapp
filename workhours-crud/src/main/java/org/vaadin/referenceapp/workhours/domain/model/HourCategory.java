package org.vaadin.referenceapp.workhours.domain.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import org.vaadin.referenceapp.workhours.domain.base.BaseEntity;

@Entity
@Table(name = "hour_categories")
public class HourCategory extends BaseEntity<Long> {

    @Column(name = "hour_category_name")
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
