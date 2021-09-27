package com.companypersonneljava.personnel.service;

import com.companypersonneljava.personnel.domain.Location;
import com.companypersonneljava.personnel.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LocationServiceImpl implements LocationService{

    private final LocationRepository repository;

    @Autowired
    private LocationServiceImpl(LocationRepository repository) {
        this.repository = repository;
    }

    @Override
    public void save(Location location) {
        repository.save(location);
    }

    @Override
    public Iterable<Location> getAll() {
        return repository.findAll();
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
