package com.companypersonneljava.personnel.controller;

import com.companypersonneljava.personnel.domain.Location;
import com.companypersonneljava.personnel.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("${cors.origin}")
@RequestMapping("/location")
public class LocationController {


    private final LocationService service;

    @Autowired
    private LocationController(LocationService service) {
        this.service = service;
    }


    @GetMapping("/all")
    @ResponseBody
    public Iterable<Location> getAll() {
        return service.getAll();
    }

    @PostMapping("/save")
    @ResponseBody
    public Location save(@RequestBody Location location) {
        service.save(location);
        return location;
    }


    @PostMapping("/delete")
    int deleteById(@RequestBody Long id) {
        int numOfDepartmentsInLocation = service.getCountByID(id);
        if (numOfDepartmentsInLocation == 0)
            service.delete(id);
        return numOfDepartmentsInLocation;
    }

}
