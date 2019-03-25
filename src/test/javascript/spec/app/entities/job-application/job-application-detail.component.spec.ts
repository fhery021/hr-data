/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HrDataTestModule } from '../../../test.module';
import { JobApplicationDetailComponent } from 'app/entities/job-application/job-application-detail.component';
import { JobApplication } from 'app/shared/model/job-application.model';

describe('Component Tests', () => {
    describe('JobApplication Management Detail Component', () => {
        let comp: JobApplicationDetailComponent;
        let fixture: ComponentFixture<JobApplicationDetailComponent>;
        const route = ({ data: of({ jobApplication: new JobApplication(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HrDataTestModule],
                declarations: [JobApplicationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(JobApplicationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(JobApplicationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.jobApplication).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
