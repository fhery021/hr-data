package com.fhery021.hrdata.web.rest;
import com.fhery021.hrdata.domain.JobApplication;
import com.fhery021.hrdata.repository.JobApplicationRepository;
import com.fhery021.hrdata.web.rest.errors.BadRequestAlertException;
import com.fhery021.hrdata.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing JobApplication.
 */
@RestController
@RequestMapping("/api")
public class JobApplicationResource {

    private final Logger log = LoggerFactory.getLogger(JobApplicationResource.class);

    private static final String ENTITY_NAME = "jobApplication";

    private final JobApplicationRepository jobApplicationRepository;

    public JobApplicationResource(JobApplicationRepository jobApplicationRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
    }

    /**
     * POST  /job-applications : Create a new jobApplication.
     *
     * @param jobApplication the jobApplication to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jobApplication, or with status 400 (Bad Request) if the jobApplication has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/job-applications")
    public ResponseEntity<JobApplication> createJobApplication(@RequestBody JobApplication jobApplication) throws URISyntaxException {
        log.debug("REST request to save JobApplication : {}", jobApplication);
        if (jobApplication.getId() != null) {
            throw new BadRequestAlertException("A new jobApplication cannot already have an ID", ENTITY_NAME, "idexists");
        }
        JobApplication result = jobApplicationRepository.save(jobApplication);
        return ResponseEntity.created(new URI("/api/job-applications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /job-applications : Updates an existing jobApplication.
     *
     * @param jobApplication the jobApplication to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jobApplication,
     * or with status 400 (Bad Request) if the jobApplication is not valid,
     * or with status 500 (Internal Server Error) if the jobApplication couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/job-applications")
    public ResponseEntity<JobApplication> updateJobApplication(@RequestBody JobApplication jobApplication) throws URISyntaxException {
        log.debug("REST request to update JobApplication : {}", jobApplication);
        if (jobApplication.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        JobApplication result = jobApplicationRepository.save(jobApplication);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, jobApplication.getId().toString()))
            .body(result);
    }

    /**
     * GET  /job-applications : get all the jobApplications.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of jobApplications in body
     */
    @GetMapping("/job-applications")
    public List<JobApplication> getAllJobApplications() {
        log.debug("REST request to get all JobApplications");
        return jobApplicationRepository.findAll();
    }

    /**
     * GET  /job-applications/:id : get the "id" jobApplication.
     *
     * @param id the id of the jobApplication to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jobApplication, or with status 404 (Not Found)
     */
    @GetMapping("/job-applications/{id}")
    public ResponseEntity<JobApplication> getJobApplication(@PathVariable Long id) {
        log.debug("REST request to get JobApplication : {}", id);
        Optional<JobApplication> jobApplication = jobApplicationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(jobApplication);
    }

    /**
     * DELETE  /job-applications/:id : delete the "id" jobApplication.
     *
     * @param id the id of the jobApplication to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/job-applications/{id}")
    public ResponseEntity<Void> deleteJobApplication(@PathVariable Long id) {
        log.debug("REST request to delete JobApplication : {}", id);
        jobApplicationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
