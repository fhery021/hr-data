/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { HrDataTestModule } from '../../../test.module';
import { JobLinkUpdateComponent } from 'app/entities/job-link/job-link-update.component';
import { JobLinkService } from 'app/entities/job-link/job-link.service';
import { JobLink } from 'app/shared/model/job-link.model';

describe('Component Tests', () => {
    describe('JobLink Management Update Component', () => {
        let comp: JobLinkUpdateComponent;
        let fixture: ComponentFixture<JobLinkUpdateComponent>;
        let service: JobLinkService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HrDataTestModule],
                declarations: [JobLinkUpdateComponent]
            })
                .overrideTemplate(JobLinkUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(JobLinkUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobLinkService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new JobLink(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.jobLink = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new JobLink();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.jobLink = entity;
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
