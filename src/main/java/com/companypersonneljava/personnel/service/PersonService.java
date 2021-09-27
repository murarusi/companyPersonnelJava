package com.companypersonneljava.personnel.service;

import com.companypersonneljava.personnel.domain.Person;
import com.companypersonneljava.personnel.domain.PersonDTO;

import java.util.List;


public interface PersonService {
    List<PersonDTO> getAll();

    void save(Person person);

    void delete(Long id);

    PersonDTO getOne(Long id);
}
