package com.fhery021.hrdata.web.rest;

import com.fhery021.hrdata.HrDataApp;

import com.fhery021.hrdata.domain.JobApplication;
import com.fhery021.hrdata.repository.JobApplicationRepository;
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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.fhery021.hrdata.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the JobApplicationResource REST controller.
 *
 * @see JobApplicationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HrDataApp.class)
public class JobApplicationResourceIntTest {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final byte[] DEFAULT_ATTACHMENT = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_ATTACHMENT = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_ATTACHMENT_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_ATTACHMENT_CONTENT_TYPE = "image/png";

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

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

    private MockMvc restJobApplicationMockMvc;

    private JobApplication jobApplication;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final JobApplicationResource jobApplicationResource = new JobApplicationResource(jobApplicationRepository);
        this.restJobApplicationMockMvc = MockMvcBuilders.standaloneSetup(jobApplicationResource)
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
    public static JobApplication createEntity(EntityManager em) {
        JobApplication jobApplication = new JobApplication()
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .email(DEFAULT_EMAIL)
            .phone(DEFAULT_PHONE)
            .address(DEFAULT_ADDRESS)
            .attachment(DEFAULT_ATTACHMENT)
            .attachmentContentType(DEFAULT_ATTACHMENT_CONTENT_TYPE);
        return jobApplication;
    }

    @Before
    public void initTest() {
        jobApplication = createEntity(em);
    }

    @Test
    @Transactional
    public void createJobApplication() throws Exception {
        int databaseSizeBeforeCreate = jobApplicationRepository.findAll().size();

        // Create the JobApplication
        restJobApplicationMockMvc.perform(post("/api/job-applications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobApplication)))
            .andExpect(status().isCreated());

        // Validate the JobApplication in the database
        List<JobApplication> jobApplicationList = jobApplicationRepository.findAll();
        assertThat(jobApplicationList).hasSize(databaseSizeBeforeCreate + 1);
        JobApplication testJobApplication = jobApplicationList.get(jobApplicationList.size() - 1);
        assertThat(testJobApplication.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testJobApplication.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testJobApplication.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testJobApplication.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testJobApplication.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testJobApplication.getAttachment()).isEqualTo(DEFAULT_ATTACHMENT);
        assertThat(testJobApplication.getAttachmentContentType()).isEqualTo(DEFAULT_ATTACHMENT_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createJobApplicationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = jobApplicationRepository.findAll().size();

        // Create the JobApplication with an existing ID
        jobApplication.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restJobApplicationMockMvc.perform(post("/api/job-applications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobApplication)))
            .andExpect(status().isBadRequest());

        // Validate the JobApplication in the database
        List<JobApplication> jobApplicationList = jobApplicationRepository.findAll();
        assertThat(jobApplicationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllJobApplications() throws Exception {
        // Initialize the database
        jobApplicationRepository.saveAndFlush(jobApplication);

        // Get all the jobApplicationList
        restJobApplicationMockMvc.perform(get("/api/job-applications?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jobApplication.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME.toString())))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].attachmentContentType").value(hasItem(DEFAULT_ATTACHMENT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].attachment").value(hasItem(Base64Utils.encodeToString(DEFAULT_ATTACHMENT))));
    }
    
    @Test
    @Transactional
    public void getJobApplication() throws Exception {
        // Initialize the database
        jobApplicationRepository.saveAndFlush(jobApplication);

        // Get the jobApplication
        restJobApplicationMockMvc.perform(get("/api/job-applications/{id}", jobApplication.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(jobApplication.getId().intValue()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME.toString()))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()))
            .andExpect(jsonPath("$.attachmentContentType").value(DEFAULT_ATTACHMENT_CONTENT_TYPE))
            .andExpect(jsonPath("$.attachment").value(Base64Utils.encodeToString(DEFAULT_ATTACHMENT)));
    }

    @Test
    @Transactional
    public void getNonExistingJobApplication() throws Exception {
        // Get the jobApplication
        restJobApplicationMockMvc.perform(get("/api/job-applications/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateJobApplication() throws Exception {
        // Initialize the database
        jobApplicationRepository.saveAndFlush(jobApplication);

        int databaseSizeBeforeUpdate = jobApplicationRepository.findAll().size();

        // Update the jobApplication
        JobApplication updatedJobApplication = jobApplicationRepository.findById(jobApplication.getId()).get();
        // Disconnect from session so that the updates on updatedJobApplication are not directly saved in db
        em.detach(updatedJobApplication);
        updatedJobApplication
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL)
            .phone(UPDATED_PHONE)
            .address(UPDATED_ADDRESS)
            .attachment(UPDATED_ATTACHMENT)
            .attachmentContentType(UPDATED_ATTACHMENT_CONTENT_TYPE);

        restJobApplicationMockMvc.perform(put("/api/job-applications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedJobApplication)))
            .andExpect(status().isOk());

        // Validate the JobApplication in the database
        List<JobApplication> jobApplicationList = jobApplicationRepository.findAll();
        assertThat(jobApplicationList).hasSize(databaseSizeBeforeUpdate);
        JobApplication testJobApplication = jobApplicationList.get(jobApplicationList.size() - 1);
        assertThat(testJobApplication.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testJobApplication.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testJobApplication.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testJobApplication.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testJobApplication.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testJobApplication.getAttachment()).isEqualTo(UPDATED_ATTACHMENT);
        assertThat(testJobApplication.getAttachmentContentType()).isEqualTo(UPDATED_ATTACHMENT_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingJobApplication() throws Exception {
        int databaseSizeBeforeUpdate = jobApplicationRepository.findAll().size();

        // Create the JobApplication

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restJobApplicationMockMvc.perform(put("/api/job-applications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobApplication)))
            .andExpect(status().isBadRequest());

        // Validate the JobApplication in the database
        List<JobApplication> jobApplicationList = jobApplicationRepository.findAll();
        assertThat(jobApplicationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteJobApplication() throws Exception {
        // Initialize the database
        jobApplicationRepository.saveAndFlush(jobApplication);

        int databaseSizeBeforeDelete = jobApplicationRepository.findAll().size();

        // Delete the jobApplication
        restJobApplicationMockMvc.perform(delete("/api/job-applications/{id}", jobApplication.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<JobApplication> jobApplicationList = jobApplicationRepository.findAll();
        assertThat(jobApplicationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(JobApplication.class);
        JobApplication jobApplication1 = new JobApplication();
        jobApplication1.setId(1L);
        JobApplication jobApplication2 = new JobApplication();
        jobApplication2.setId(jobApplication1.getId());
        assertThat(jobApplication1).isEqualTo(jobApplication2);
        jobApplication2.setId(2L);
        assertThat(jobApplication1).isNotEqualTo(jobApplication2);
        jobApplication1.setId(null);
        assertThat(jobApplication1).isNotEqualTo(jobApplication2);
    }
}
