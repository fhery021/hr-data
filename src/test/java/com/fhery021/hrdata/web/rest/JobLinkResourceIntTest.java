package com.fhery021.hrdata.web.rest;

import com.fhery021.hrdata.HrDataApp;

import com.fhery021.hrdata.domain.JobLink;
import com.fhery021.hrdata.repository.JobLinkRepository;
import com.fhery021.hrdata.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.fhery021.hrdata.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the JobLinkResource REST controller.
 *
 * @see JobLinkResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HrDataApp.class)
public class JobLinkResourceIntTest {

    private static final String DEFAULT_LINK = "AAAAAAAAAA";
    private static final String UPDATED_LINK = "BBBBBBBBBB";

    @Autowired
    private JobLinkRepository jobLinkRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restJobLinkMockMvc;

    private JobLink jobLink;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final JobLinkResource jobLinkResource = new JobLinkResource(jobLinkRepository);
        this.restJobLinkMockMvc = MockMvcBuilders.standaloneSetup(jobLinkResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static JobLink createEntity(EntityManager em) {
        JobLink jobLink = new JobLink()
            .link(DEFAULT_LINK);
        return jobLink;
    }

    @Before
    public void initTest() {
        jobLink = createEntity(em);
    }

    @Test
    @Transactional
    public void createJobLink() throws Exception {
        int databaseSizeBeforeCreate = jobLinkRepository.findAll().size();

        // Create the JobLink
        restJobLinkMockMvc.perform(post("/api/job-links")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobLink)))
            .andExpect(status().isCreated());

        // Validate the JobLink in the database
        List<JobLink> jobLinkList = jobLinkRepository.findAll();
        assertThat(jobLinkList).hasSize(databaseSizeBeforeCreate + 1);
        JobLink testJobLink = jobLinkList.get(jobLinkList.size() - 1);
        assertThat(testJobLink.getLink()).isEqualTo(DEFAULT_LINK);
    }

    @Test
    @Transactional
    public void createJobLinkWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = jobLinkRepository.findAll().size();

        // Create the JobLink with an existing ID
        jobLink.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restJobLinkMockMvc.perform(post("/api/job-links")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobLink)))
            .andExpect(status().isBadRequest());

        // Validate the JobLink in the database
        List<JobLink> jobLinkList = jobLinkRepository.findAll();
        assertThat(jobLinkList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllJobLinks() throws Exception {
        // Initialize the database
        jobLinkRepository.saveAndFlush(jobLink);

        // Get all the jobLinkList
        restJobLinkMockMvc.perform(get("/api/job-links?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jobLink.getId().intValue())))
            .andExpect(jsonPath("$.[*].link").value(hasItem(DEFAULT_LINK.toString())));
    }
    
    @Test
    @Transactional
    public void getJobLink() throws Exception {
        // Initialize the database
        jobLinkRepository.saveAndFlush(jobLink);

        // Get the jobLink
        restJobLinkMockMvc.perform(get("/api/job-links/{id}", jobLink.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(jobLink.getId().intValue()))
            .andExpect(jsonPath("$.link").value(DEFAULT_LINK.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingJobLink() throws Exception {
        // Get the jobLink
        restJobLinkMockMvc.perform(get("/api/job-links/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateJobLink() throws Exception {
        // Initialize the database
        jobLinkRepository.saveAndFlush(jobLink);

        int databaseSizeBeforeUpdate = jobLinkRepository.findAll().size();

        // Update the jobLink
        JobLink updatedJobLink = jobLinkRepository.findById(jobLink.getId()).get();
        // Disconnect from session so that the updates on updatedJobLink are not directly saved in db
        em.detach(updatedJobLink);
        updatedJobLink
            .link(UPDATED_LINK);

        restJobLinkMockMvc.perform(put("/api/job-links")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedJobLink)))
            .andExpect(status().isOk());

        // Validate the JobLink in the database
        List<JobLink> jobLinkList = jobLinkRepository.findAll();
        assertThat(jobLinkList).hasSize(databaseSizeBeforeUpdate);
        JobLink testJobLink = jobLinkList.get(jobLinkList.size() - 1);
        assertThat(testJobLink.getLink()).isEqualTo(UPDATED_LINK);
    }

    @Test
    @Transactional
    public void updateNonExistingJobLink() throws Exception {
        int databaseSizeBeforeUpdate = jobLinkRepository.findAll().size();

        // Create the JobLink

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restJobLinkMockMvc.perform(put("/api/job-links")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobLink)))
            .andExpect(status().isBadRequest());

        // Validate the JobLink in the database
        List<JobLink> jobLinkList = jobLinkRepository.findAll();
        assertThat(jobLinkList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteJobLink() throws Exception {
        // Initialize the database
        jobLinkRepository.saveAndFlush(jobLink);

        int databaseSizeBeforeDelete = jobLinkRepository.findAll().size();

        // Delete the jobLink
        restJobLinkMockMvc.perform(delete("/api/job-links/{id}", jobLink.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<JobLink> jobLinkList = jobLinkRepository.findAll();
        assertThat(jobLinkList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(JobLink.class);
        JobLink jobLink1 = new JobLink();
        jobLink1.setId(1L);
        JobLink jobLink2 = new JobLink();
        jobLink2.setId(jobLink1.getId());
        assertThat(jobLink1).isEqualTo(jobLink2);
        jobLink2.setId(2L);
        assertThat(jobLink1).isNotEqualTo(jobLink2);
        jobLink1.setId(null);
        assertThat(jobLink1).isNotEqualTo(jobLink2);
    }
}
