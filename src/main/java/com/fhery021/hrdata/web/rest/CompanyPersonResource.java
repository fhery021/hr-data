package com.fhery021.hrdata.web.rest;
import com.fhery021.hrdata.domain.CompanyPerson;
import com.fhery021.hrdata.repository.CompanyPersonRepository;
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
 * REST controller for managing CompanyPerson.
 */
@RestController
@RequestMapping("/api")
public class CompanyPersonResource {

    private final Logger log = LoggerFactory.getLogger(CompanyPersonResource.class);

    private static final String ENTITY_NAME = "companyPerson";

    private final CompanyPersonRepository companyPersonRepository;

    public CompanyPersonResource(CompanyPersonRepository companyPersonRepository) {
        this.companyPersonRepository = companyPersonRepository;
    }

    /**
     * POST  /company-people : Create a new companyPerson.
     *
     * @param companyPerson the companyPerson to create
     * @return the ResponseEntity with status 201 (Created) and with body the new companyPerson, or with status 400 (Bad Request) if the companyPerson has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/company-people")
    public ResponseEntity<CompanyPerson> createCompanyPerson(@RequestBody CompanyPerson companyPerson) throws URISyntaxException {
        log.debug("REST request to save CompanyPerson : {}", companyPerson);
        if (companyPerson.getId() != null) {
            throw new BadRequestAlertException("A new companyPerson cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CompanyPerson result = companyPersonRepository.save(companyPerson);
        return ResponseEntity.created(new URI("/api/company-people/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /company-people : Updates an existing companyPerson.
     *
     * @param companyPerson the companyPerson to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated companyPerson,
     * or with status 400 (Bad Request) if the companyPerson is not valid,
     * or with status 500 (Internal Server Error) if the companyPerson couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/company-people")
    public ResponseEntity<CompanyPerson> updateCompanyPerson(@RequestBody CompanyPerson companyPerson) throws URISyntaxException {
        log.debug("REST request to update CompanyPerson : {}", companyPerson);
        if (companyPerson.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CompanyPerson result = companyPersonRepository.save(companyPerson);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, companyPerson.getId().toString()))
            .body(result);
    }

    /**
     * GET  /company-people : get all the companyPeople.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of companyPeople in body
     */
    @GetMapping("/company-people")
    public List<CompanyPerson> getAllCompanyPeople() {
        log.debug("REST request to get all CompanyPeople");
        return companyPersonRepository.findAll();
    }

    /**
     * GET  /company-people/:id : get the "id" companyPerson.
     *
     * @param id the id of the companyPerson to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the companyPerson, or with status 404 (Not Found)
     */
    @GetMapping("/company-people/{id}")
    public ResponseEntity<CompanyPerson> getCompanyPerson(@PathVariable Long id) {
        log.debug("REST request to get CompanyPerson : {}", id);
        Optional<CompanyPerson> companyPerson = companyPersonRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(companyPerson);
    }

    /**
     * DELETE  /company-people/:id : delete the "id" companyPerson.
     *
     * @param id the id of the companyPerson to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/company-people/{id}")
    public ResponseEntity<Void> deleteCompanyPerson(@PathVariable Long id) {
        log.debug("REST request to delete CompanyPerson : {}", id);
        companyPersonRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
