package com.companypersonneljava.personnel.repository;

import com.companypersonneljava.personnel.domain.Location;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends CrudRepository<Location, Long> {


    @Query("select count(d.id)  from Department d where d.locationID = ?1")
    int countByID(Long id);

}
