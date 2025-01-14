package org.vaadin.referenceapp.workhours.domain.model;

import jakarta.persistence.*;
import org.vaadin.referenceapp.workhours.domain.base.BaseEntity;

import java.util.Set;

@Entity
@Table(name = "contracts")
public class Contract extends BaseEntity<Long> {

    @JoinColumn(name = "project_id", nullable = false)
    @ManyToOne(optional = false)
    private Project project;

    @Column(name = "contract_name", nullable = false)
    private String name;

    @JoinTable(name = "contract_hour_categories",
            joinColumns = @JoinColumn(name = "contract_id", nullable = false),
            inverseJoinColumns = @JoinColumn(name = "hour_category_id", nullable = false))
    @ManyToMany
    private Set<HourCategory> allowedHourCategories;

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<HourCategory> getAllowedHourCategories() {
        return allowedHourCategories;
    }

    public void setAllowedHourCategories(Set<HourCategory> allowedHourCategories) {
        this.allowedHourCategories = allowedHourCategories;
    }
}
