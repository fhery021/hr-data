/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HrDataTestModule } from '../../../test.module';
import { JobLinkDetailComponent } from 'app/entities/job-link/job-link-detail.component';
import { JobLink } from 'app/shared/model/job-link.model';

describe('Component Tests', () => {
    describe('JobLink Management Detail Component', () => {
        let comp: JobLinkDetailComponent;
        let fixture: ComponentFixture<JobLinkDetailComponent>;
        const route = ({ data: of({ jobLink: new JobLink(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HrDataTestModule],
                declarations: [JobLinkDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(JobLinkDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(JobLinkDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.jobLink).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
