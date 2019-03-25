package com.fhery021.hrdata.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.fhery021.hrdata.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.fhery021.hrdata.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.fhery021.hrdata.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.fhery021.hrdata.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.fhery021.hrdata.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.fhery021.hrdata.domain.CompanyPerson.class.getName(), jcacheConfiguration);
            cm.createCache(com.fhery021.hrdata.domain.CompanyPerson.class.getName() + ".jobs", jcacheConfiguration);
            cm.createCache(com.fhery021.hrdata.domain.Candidate.class.getName(), jcacheConfiguration);
            cm.createCache(com.fhery021.hrdata.domain.Candidate.class.getName() + ".jobApplications", jcacheConfiguration);
            cm.createCache(com.fhery021.hrdata.domain.Job.class.getName(), jcacheConfiguration);
            cm.createCache(com.fhery021.hrdata.domain.JobApplication.class.getName(), jcacheConfiguration);
            cm.createCache(com.fhery021.hrdata.domain.JobLink.class.getName(), jcacheConfiguration);
            cm.createCache(com.fhery021.hrdata.domain.JobLink.class.getName() + ".jobs", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
