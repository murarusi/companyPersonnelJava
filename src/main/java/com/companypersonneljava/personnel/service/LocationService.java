package com.companypersonneljava.personnel.service;

import com.companypersonneljava.personnel.domain.Location;

public interface LocationService {
    void save(Location location);

    Iterable<Location> getAll();

    void delete(Long id);

    int getCountByID(Long id);
}
