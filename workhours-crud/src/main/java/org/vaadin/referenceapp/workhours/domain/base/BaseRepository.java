package org.vaadin.referenceapp.workhours.domain.base;

import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.lang.Nullable;

import java.io.Serializable;
import java.util.Optional;

@NoRepositoryBean
public interface BaseRepository<T extends BaseEntity<ID>, ID extends Serializable> extends JpaRepository<T, ID> {

    default T getById(@Nullable ID id) {
        return Optional.ofNullable(id)
                .flatMap(this::findById)
                .orElseThrow(() -> new IncorrectResultSizeDataAccessException("Entity does not exist", 1, 0));
    }
}
