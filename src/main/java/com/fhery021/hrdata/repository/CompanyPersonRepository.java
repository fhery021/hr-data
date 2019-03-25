package com.fhery021.hrdata.repository;

import com.fhery021.hrdata.domain.CompanyPerson;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CompanyPerson entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompanyPersonRepository extends JpaRepository<CompanyPerson, Long> {

}
