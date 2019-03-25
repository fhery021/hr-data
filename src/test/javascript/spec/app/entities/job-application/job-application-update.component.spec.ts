/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { HrDataTestModule } from '../../../test.module';
import { JobApplicationUpdateComponent } from 'app/entities/job-application/job-application-update.component';
import { JobApplicationService } from 'app/entities/job-application/job-application.service';
import { JobApplication } from 'app/shared/model/job-application.model';

describe('Component Tests', () => {
    describe('JobApplication Management Update Component', () => {
        let comp: JobApplicationUpdateComponent;
        let fixture: ComponentFixture<JobApplicationUpdateComponent>;
        let service: JobApplicationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HrDataTestModule],
                declarations: [JobApplicationUpdateComponent]
            })
                .overrideTemplate(JobApplicationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(JobApplicationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobApplicationService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new JobApplication(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.jobApplication = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new JobApplication();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.jobApplication = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
