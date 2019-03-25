package com.fhery021.hrdata.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A CompanyPerson.
 */
@Entity
@Table(name = "company_person")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CompanyPerson implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "mobile")
    private String mobile;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "title")
    private String title;

    @Column(name = "nr_employees")
    private Long nrEmployees;

    @OneToMany(mappedBy = "companyPerson")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Job> jobs = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public CompanyPerson firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public CompanyPerson lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public CompanyPerson email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public CompanyPerson mobile(String mobile) {
        this.mobile = mobile;
        return this;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getCompanyName() {
        return companyName;
    }

    public CompanyPerson companyName(String companyName) {
        this.companyName = companyName;
        return this;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getTitle() {
        return title;
    }

    public CompanyPerson title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getNrEmployees() {
        return nrEmployees;
    }

    public CompanyPerson nrEmployees(Long nrEmployees) {
        this.nrEmployees = nrEmployees;
        return this;
    }

    public void setNrEmployees(Long nrEmployees) {
        this.nrEmployees = nrEmployees;
    }

    public Set<Job> getJobs() {
        return jobs;
    }

    public CompanyPerson jobs(Set<Job> jobs) {
        this.jobs = jobs;
        return this;
    }

    public CompanyPerson addJob(Job job) {
        this.jobs.add(job);
        job.setCompanyPerson(this);
        return this;
    }

    public CompanyPerson removeJob(Job job) {
        this.jobs.remove(job);
        job.setCompanyPerson(null);
        return this;
    }

    public void setJobs(Set<Job> jobs) {
        this.jobs = jobs;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CompanyPerson companyPerson = (CompanyPerson) o;
        if (companyPerson.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), companyPerson.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CompanyPerson{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", email='" + getEmail() + "'" +
            ", mobile='" + getMobile() + "'" +
            ", companyName='" + getCompanyName() + "'" +
            ", title='" + getTitle() + "'" +
            ", nrEmployees=" + getNrEmployees() +
            "}";
    }
}
