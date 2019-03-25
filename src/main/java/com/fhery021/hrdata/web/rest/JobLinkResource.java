package com.fhery021.hrdata.web.rest;
import com.fhery021.hrdata.domain.JobLink;
import com.fhery021.hrdata.repository.JobLinkRepository;
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
 * REST controller for managing JobLink.
 */
@RestController
@RequestMapping("/api")
public class JobLinkResource {

    private final Logger log = LoggerFactory.getLogger(JobLinkResource.class);

    private static final String ENTITY_NAME = "jobLink";

    private final JobLinkRepository jobLinkRepository;

    public JobLinkResource(JobLinkRepository jobLinkRepository) {
        this.jobLinkRepository = jobLinkRepository;
    }

    /**
     * POST  /job-links : Create a new jobLink.
     *
     * @param jobLink the jobLink to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jobLink, or with status 400 (Bad Request) if the jobLink has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/job-links")
    public ResponseEntity<JobLink> createJobLink(@RequestBody JobLink jobLink) throws URISyntaxException {
        log.debug("REST request to save JobLink : {}", jobLink);
        if (jobLink.getId() != null) {
            throw new BadRequestAlertException("A new jobLink cannot already have an ID", ENTITY_NAME, "idexists");
        }
        JobLink result = jobLinkRepository.save(jobLink);
        return ResponseEntity.created(new URI("/api/job-links/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /job-links : Updates an existing jobLink.
     *
     * @param jobLink the jobLink to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jobLink,
     * or with status 400 (Bad Request) if the jobLink is not valid,
     * or with status 500 (Internal Server Error) if the jobLink couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/job-links")
    public ResponseEntity<JobLink> updateJobLink(@RequestBody JobLink jobLink) throws URISyntaxException {
        log.debug("REST request to update JobLink : {}", jobLink);
        if (jobLink.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        JobLink result = jobLinkRepository.save(jobLink);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, jobLink.getId().toString()))
            .body(result);
    }

    /**
     * GET  /job-links : get all the jobLinks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of jobLinks in body
     */
    @GetMapping("/job-links")
    public List<JobLink> getAllJobLinks() {
        log.debug("REST request to get all JobLinks");
        return jobLinkRepository.findAll();
    }

    /**
     * GET  /job-links/:id : get the "id" jobLink.
     *
     * @param id the id of the jobLink to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jobLink, or with status 404 (Not Found)
     */
    @GetMapping("/job-links/{id}")
    public ResponseEntity<JobLink> getJobLink(@PathVariable Long id) {
        log.debug("REST request to get JobLink : {}", id);
        Optional<JobLink> jobLink = jobLinkRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(jobLink);
    }

    /**
     * DELETE  /job-links/:id : delete the "id" jobLink.
     *
     * @param id the id of the jobLink to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/job-links/{id}")
    public ResponseEntity<Void> deleteJobLink(@PathVariable Long id) {
        log.debug("REST request to delete JobLink : {}", id);
        jobLinkRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
