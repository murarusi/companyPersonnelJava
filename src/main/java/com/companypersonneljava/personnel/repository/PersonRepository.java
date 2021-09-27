package com.companypersonneljava.personnel.repository;

import com.companypersonneljava.personnel.domain.Person;
import com.companypersonneljava.personnel.domain.PersonDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonRepository extends CrudRepository<Person, Long> {

    @Query("SELECT new com.companypersonneljava.personnel.domain.PersonDTO(p.id, p.departmentID, p.firstName, p.lastName, p.jobTitle, p.email ,d.name, l.name) FROM Person p LEFT JOIN Department d ON (d.id = p.departmentID) LEFT JOIN Location l ON (l.id = d.locationID) ORDER BY p.lastName, p.firstName, d.name, l.name")
    List<PersonDTO> getAll();

    @Query("SELECT new com.companypersonneljava.personnel.domain.PersonDTO(p.id, p.departmentID, p.firstName, p.lastName, p.jobTitle, p.email ,d.name, l.name) FROM Person p LEFT JOIN Department d ON (d.id = p.departmentID) LEFT JOIN Location l ON (l.id = d.locationID) where p.id = ?1")
    PersonDTO getOne(Long id);
}
