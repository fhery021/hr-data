/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HrDataTestModule } from '../../../test.module';
import { JobApplicationComponent } from 'app/entities/job-application/job-application.component';
import { JobApplicationService } from 'app/entities/job-application/job-application.service';
import { JobApplication } from 'app/shared/model/job-application.model';

describe('Component Tests', () => {
    describe('JobApplication Management Component', () => {
        let comp: JobApplicationComponent;
        let fixture: ComponentFixture<JobApplicationComponent>;
        let service: JobApplicationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HrDataTestModule],
                declarations: [JobApplicationComponent],
                providers: []
            })
                .overrideTemplate(JobApplicationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(JobApplicationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobApplicationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new JobApplication(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.jobApplications[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
