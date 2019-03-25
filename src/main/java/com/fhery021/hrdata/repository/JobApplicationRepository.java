package com.fhery021.hrdata.repository;

import com.fhery021.hrdata.domain.JobApplication;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the JobApplication entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

}
