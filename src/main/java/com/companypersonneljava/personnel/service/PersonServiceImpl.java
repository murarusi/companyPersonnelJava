package com.companypersonneljava.personnel.service;

import com.companypersonneljava.personnel.domain.Person;
import com.companypersonneljava.personnel.domain.PersonDTO;
import com.companypersonneljava.personnel.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonServiceImpl implements PersonService {

    private final PersonRepository repository;

    @Autowired
    public PersonServiceImpl(PersonRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<PersonDTO> getAll(){
        return repository.getAll();
    }

    @Override
    public void save(Person person) {
        repository.save(person);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public PersonDTO getOne(Long id) {
        return repository.getOne(id);
    }
}
