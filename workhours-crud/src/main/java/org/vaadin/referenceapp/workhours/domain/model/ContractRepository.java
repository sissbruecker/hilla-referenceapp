package org.vaadin.referenceapp.workhours.domain.model;

import org.vaadin.referenceapp.workhours.domain.base.BaseRepository;

import java.util.List;

public interface ContractRepository extends BaseRepository<Contract, Long> {

    List<Contract> findByProject(Project project);
}
