package com.companypersonneljava.personnel.repository;

import com.companypersonneljava.personnel.domain.Department;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DepartmentRepository extends CrudRepository<Department, Long> {


    @Query("select count(p.id)  from Person p where p.departmentID = ?1")
    int countByID(Long id);

}
