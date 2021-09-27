package com.companypersonneljava.personnel.controller;


import com.companypersonneljava.personnel.domain.Person;
import com.companypersonneljava.personnel.domain.PersonDTO;
import com.companypersonneljava.personnel.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("${cors.origin}")
@RestController
@RequestMapping("/person")
public class PersonController {

    private final PersonService service;

    @Autowired
    private PersonController(PersonService service) {
        this.service = service;
    }

    @GetMapping("/all")
    @ResponseBody
    public List<PersonDTO> getAll(){
        return service.getAll();
    }

    @PostMapping("/save")
    @ResponseBody
    public PersonDTO save(@RequestBody Person person){
        service.save(person);
        return service.getOne(person.getId());
    }

    @PostMapping("/delete")
    void deleteById(@RequestBody Long id){
    service.delete(id);
    }

}
