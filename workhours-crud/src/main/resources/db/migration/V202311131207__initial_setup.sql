CREATE TABLE projects
(
    id           BIGSERIAL    NOT NULL,
    project_name VARCHAR(300) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE contracts
(
    id            BIGSERIAL    NOT NULL,
    project_id    BIGINT       NOT NULL,
    contract_name VARCHAR(300) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (project_id) REFERENCES projects (id)
);

CREATE TABLE hour_categories
(
    id                 BIGSERIAL    NOT NULL,
    hour_category_name VARCHAR(300) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE work_log_entries
(
    id               BIGSERIAL                NOT NULL,
    created_on       TIMESTAMP WITH TIME ZONE NOT NULL,
    created_by       VARCHAR(255)             NOT NULL,
    modified_on      TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_by      VARCHAR(255)             NOT NULL,
    project_id       BIGINT                   NOT NULL,
    contract_id      BIGINT                   NOT NULL,
    hour_category_id BIGINT                   NOT NULL,
    work_date        DATE                     NOT NULL,
    start_time       TIME                     NOT NULL,
    end_time         TIME                     NOT NULL,
    description      VARCHAR(3000)            NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (project_id) REFERENCES projects (id),
    FOREIGN KEY (contract_id) REFERENCES contracts (id),
    FOREIGN KEY (hour_category_id) REFERENCES hour_categories (id)
);
