package org.vaadin.referenceapp.workhours.domain.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import org.vaadin.referenceapp.workhours.domain.base.BaseEntity;

@Entity
@Table(name = "projects")
public class Project extends BaseEntity<Long> {

    @Column(name = "project_name", unique = true, nullable = false)
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
