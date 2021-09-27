package com.companypersonneljava.personnel.service;

import com.companypersonneljava.personnel.domain.Department;
import com.companypersonneljava.personnel.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DepartmentServiceImpl implements DepartmentService{

    private final DepartmentRepository repository;

    @Autowired
    private DepartmentServiceImpl(DepartmentRepository repository) {
        this.repository = repository;
    }

    @Override
    public Iterable<Department> getAll() {
        return repository.findAll();
    }

    @Override
    public void save(Department department) {
        repository.save(department);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public int getCountByID(Long id) {
        return repository.countByID(id);
    }
}
