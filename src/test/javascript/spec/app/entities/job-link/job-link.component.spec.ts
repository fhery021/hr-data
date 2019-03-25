/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HrDataTestModule } from '../../../test.module';
import { JobLinkComponent } from 'app/entities/job-link/job-link.component';
import { JobLinkService } from 'app/entities/job-link/job-link.service';
import { JobLink } from 'app/shared/model/job-link.model';

describe('Component Tests', () => {
    describe('JobLink Management Component', () => {
        let comp: JobLinkComponent;
        let fixture: ComponentFixture<JobLinkComponent>;
        let service: JobLinkService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HrDataTestModule],
                declarations: [JobLinkComponent],
                providers: []
            })
                .overrideTemplate(JobLinkComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(JobLinkComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobLinkService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new JobLink(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.jobLinks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
