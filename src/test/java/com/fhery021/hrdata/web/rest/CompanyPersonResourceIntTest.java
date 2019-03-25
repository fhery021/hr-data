package com.fhery021.hrdata.web.rest;

import com.fhery021.hrdata.HrDataApp;

import com.fhery021.hrdata.domain.CompanyPerson;
import com.fhery021.hrdata.repository.CompanyPersonRepository;
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
 * Test class for the CompanyPersonResource REST controller.
 *
 * @see CompanyPersonResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HrDataApp.class)
public class CompanyPersonResourceIntTest {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_MOBILE = "AAAAAAAAAA";
    private static final String UPDATED_MOBILE = "BBBBBBBBBB";

    private static final String DEFAULT_COMPANY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final Long DEFAULT_NR_EMPLOYEES = 1L;
    private static final Long UPDATED_NR_EMPLOYEES = 2L;

    @Autowired
    private CompanyPersonRepository companyPersonRepository;

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

    private MockMvc restCompanyPersonMockMvc;

    private CompanyPerson companyPerson;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CompanyPersonResource companyPersonResource = new CompanyPersonResource(companyPersonRepository);
        this.restCompanyPersonMockMvc = MockMvcBuilders.standaloneSetup(companyPersonResource)
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
    public static CompanyPerson createEntity(EntityManager em) {
        CompanyPerson companyPerson = new CompanyPerson()
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .email(DEFAULT_EMAIL)
            .mobile(DEFAULT_MOBILE)
            .companyName(DEFAULT_COMPANY_NAME)
            .title(DEFAULT_TITLE)
            .nrEmployees(DEFAULT_NR_EMPLOYEES);
        return companyPerson;
    }

    @Before
    public void initTest() {
        companyPerson = createEntity(em);
    }

    @Test
    @Transactional
    public void createCompanyPerson() throws Exception {
        int databaseSizeBeforeCreate = companyPersonRepository.findAll().size();

        // Create the CompanyPerson
        restCompanyPersonMockMvc.perform(post("/api/company-people")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companyPerson)))
            .andExpect(status().isCreated());

        // Validate the CompanyPerson in the database
        List<CompanyPerson> companyPersonList = companyPersonRepository.findAll();
        assertThat(companyPersonList).hasSize(databaseSizeBeforeCreate + 1);
        CompanyPerson testCompanyPerson = companyPersonList.get(companyPersonList.size() - 1);
        assertThat(testCompanyPerson.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testCompanyPerson.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testCompanyPerson.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testCompanyPerson.getMobile()).isEqualTo(DEFAULT_MOBILE);
        assertThat(testCompanyPerson.getCompanyName()).isEqualTo(DEFAULT_COMPANY_NAME);
        assertThat(testCompanyPerson.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testCompanyPerson.getNrEmployees()).isEqualTo(DEFAULT_NR_EMPLOYEES);
    }

    @Test
    @Transactional
    public void createCompanyPersonWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = companyPersonRepository.findAll().size();

        // Create the CompanyPerson with an existing ID
        companyPerson.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCompanyPersonMockMvc.perform(post("/api/company-people")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companyPerson)))
            .andExpect(status().isBadRequest());

        // Validate the CompanyPerson in the database
        List<CompanyPerson> companyPersonList = companyPersonRepository.findAll();
        assertThat(companyPersonList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCompanyPeople() throws Exception {
        // Initialize the database
        companyPersonRepository.saveAndFlush(companyPerson);

        // Get all the companyPersonList
        restCompanyPersonMockMvc.perform(get("/api/company-people?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(companyPerson.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME.toString())))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].mobile").value(hasItem(DEFAULT_MOBILE.toString())))
            .andExpect(jsonPath("$.[*].companyName").value(hasItem(DEFAULT_COMPANY_NAME.toString())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].nrEmployees").value(hasItem(DEFAULT_NR_EMPLOYEES.intValue())));
    }
    
    @Test
    @Transactional
    public void getCompanyPerson() throws Exception {
        // Initialize the database
        companyPersonRepository.saveAndFlush(companyPerson);

        // Get the companyPerson
        restCompanyPersonMockMvc.perform(get("/api/company-people/{id}", companyPerson.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(companyPerson.getId().intValue()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME.toString()))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.mobile").value(DEFAULT_MOBILE.toString()))
            .andExpect(jsonPath("$.companyName").value(DEFAULT_COMPANY_NAME.toString()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.nrEmployees").value(DEFAULT_NR_EMPLOYEES.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCompanyPerson() throws Exception {
        // Get the companyPerson
        restCompanyPersonMockMvc.perform(get("/api/company-people/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCompanyPerson() throws Exception {
        // Initialize the database
        companyPersonRepository.saveAndFlush(companyPerson);

        int databaseSizeBeforeUpdate = companyPersonRepository.findAll().size();

        // Update the companyPerson
        CompanyPerson updatedCompanyPerson = companyPersonRepository.findById(companyPerson.getId()).get();
        // Disconnect from session so that the updates on updatedCompanyPerson are not directly saved in db
        em.detach(updatedCompanyPerson);
        updatedCompanyPerson
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL)
            .mobile(UPDATED_MOBILE)
            .companyName(UPDATED_COMPANY_NAME)
            .title(UPDATED_TITLE)
            .nrEmployees(UPDATED_NR_EMPLOYEES);

        restCompanyPersonMockMvc.perform(put("/api/company-people")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCompanyPerson)))
            .andExpect(status().isOk());

        // Validate the CompanyPerson in the database
        List<CompanyPerson> companyPersonList = companyPersonRepository.findAll();
        assertThat(companyPersonList).hasSize(databaseSizeBeforeUpdate);
        CompanyPerson testCompanyPerson = companyPersonList.get(companyPersonList.size() - 1);
        assertThat(testCompanyPerson.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testCompanyPerson.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testCompanyPerson.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testCompanyPerson.getMobile()).isEqualTo(UPDATED_MOBILE);
        assertThat(testCompanyPerson.getCompanyName()).isEqualTo(UPDATED_COMPANY_NAME);
        assertThat(testCompanyPerson.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testCompanyPerson.getNrEmployees()).isEqualTo(UPDATED_NR_EMPLOYEES);
    }

    @Test
    @Transactional
    public void updateNonExistingCompanyPerson() throws Exception {
        int databaseSizeBeforeUpdate = companyPersonRepository.findAll().size();

        // Create the CompanyPerson

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCompanyPersonMockMvc.perform(put("/api/company-people")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companyPerson)))
            .andExpect(status().isBadRequest());

        // Validate the CompanyPerson in the database
        List<CompanyPerson> companyPersonList = companyPersonRepository.findAll();
        assertThat(companyPersonList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCompanyPerson() throws Exception {
        // Initialize the database
        companyPersonRepository.saveAndFlush(companyPerson);

        int databaseSizeBeforeDelete = companyPersonRepository.findAll().size();

        // Delete the companyPerson
        restCompanyPersonMockMvc.perform(delete("/api/company-people/{id}", companyPerson.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CompanyPerson> companyPersonList = companyPersonRepository.findAll();
        assertThat(companyPersonList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CompanyPerson.class);
        CompanyPerson companyPerson1 = new CompanyPerson();
        companyPerson1.setId(1L);
        CompanyPerson companyPerson2 = new CompanyPerson();
        companyPerson2.setId(companyPerson1.getId());
        assertThat(companyPerson1).isEqualTo(companyPerson2);
        companyPerson2.setId(2L);
        assertThat(companyPerson1).isNotEqualTo(companyPerson2);
        companyPerson1.setId(null);
        assertThat(companyPerson1).isNotEqualTo(companyPerson2);
    }
}
