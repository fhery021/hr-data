package com.fhery021.hrdata.repository;

import com.fhery021.hrdata.domain.JobLink;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the JobLink entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JobLinkRepository extends JpaRepository<JobLink, Long> {

}
