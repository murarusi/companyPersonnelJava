package com.companypersonneljava.personnel.service;

import com.companypersonneljava.personnel.domain.Department;

public interface DepartmentService {
    Iterable<Department> getAll();

    void save(Department department);

    void delete(Long id);

    int getCountByID(Long id);
}
