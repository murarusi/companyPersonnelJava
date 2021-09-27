package com.companypersonneljava.personnel.controller;

import com.companypersonneljava.personnel.domain.Department;
import com.companypersonneljava.personnel.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/department")
@RestController
@CrossOrigin("${cors.origin}")
public class DepartmentController {

    private final DepartmentService service;

    @Autowired
    private DepartmentController(DepartmentService service) {
        this.service = service;
    }


    @GetMapping("/all")
    @ResponseBody
    public Iterable<Department> getAll(){
        return service.getAll();
    }

    @PostMapping("/save")
    @ResponseBody
    public Department save(@RequestBody Department department){System.out.println(department.toString());
        service.save(department);
        return department;
    }

    @PostMapping("/delete")
    int deleteById(@RequestBody Long id){
        int numOfPersonsInDepartment = service.getCountByID(id);
        if (numOfPersonsInDepartment == 0)
            service.delete(id);
        return numOfPersonsInDepartment;
    }

}
