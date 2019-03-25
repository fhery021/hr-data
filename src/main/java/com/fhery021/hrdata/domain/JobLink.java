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
 * A JobLink.
 */
@Entity
@Table(name = "job_link")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class JobLink implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_link")
    private String link;

    @OneToMany(mappedBy = "jobLink")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Job> jobs = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLink() {
        return link;
    }

    public JobLink link(String link) {
        this.link = link;
        return this;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Set<Job> getJobs() {
        return jobs;
    }

    public JobLink jobs(Set<Job> jobs) {
        this.jobs = jobs;
        return this;
    }

    public JobLink addJob(Job job) {
        this.jobs.add(job);
        job.setJobLink(this);
        return this;
    }

    public JobLink removeJob(Job job) {
        this.jobs.remove(job);
        job.setJobLink(null);
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
        JobLink jobLink = (JobLink) o;
        if (jobLink.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), jobLink.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "JobLink{" +
            "id=" + getId() +
            ", link='" + getLink() + "'" +
            "}";
    }
}
