INSERT INTO hour_categories (id, hour_category_name)
VALUES (1, 'Normal work');
INSERT INTO hour_categories (id, hour_category_name)
VALUES (2, 'Overtime 50%');
INSERT INTO hour_categories (id, hour_category_name)
VALUES (3, 'Overtime 100%');
INSERT INTO hour_categories (id, hour_category_name)
VALUES (4, 'Emergency work');
INSERT INTO hour_categories (id, hour_category_name)
VALUES (5, 'Evening work');

INSERT INTO projects (id, project_name)
VALUES (1, 'Customer Relationship Management System');
INSERT INTO projects (id, project_name)
VALUES (2, 'Inventory Management Software');
INSERT INTO projects (id, project_name)
VALUES (3, 'E-commerce Website Redesign');
INSERT INTO projects (id, project_name)
VALUES (4, 'Supply Chain Optimization Project');
INSERT INTO projects (id, project_name)
VALUES (5, 'Mobile App Development for Health');
INSERT INTO projects (id, project_name)
VALUES (6, 'Data Analytics and Reporting Dashboard');
INSERT INTO projects (id, project_name)
VALUES (7, 'Product Launch Strategy');
INSERT INTO projects (id, project_name)
VALUES (8, 'Financial Forecasting and Planning');
INSERT INTO projects (id, project_name)
VALUES (9, 'Human Resources Automation Initiative');
INSERT INTO projects (id, project_name)
VALUES (10, 'Market Research and Analysis');

INSERT INTO contracts (id, project_id, contract_name)
VALUES (1, 1, 'Developer');
INSERT INTO contracts (id, project_id, contract_name)
VALUES (2, 1, 'Architect');
INSERT INTO contracts (id, project_id, contract_name)
VALUES (3, 1, 'Project Manager');
INSERT INTO contract_hour_categories (contract_id, hour_category_id)
VALUES (1, 1);
INSERT INTO contract_hour_categories (contract_id, hour_category_id)
VALUES (2, 1);
INSERT INTO contract_hour_categories (contract_id, hour_category_id)
VALUES (3, 1);
