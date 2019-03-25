/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { HrDataTestModule } from '../../../test.module';
import { JobApplicationDeleteDialogComponent } from 'app/entities/job-application/job-application-delete-dialog.component';
import { JobApplicationService } from 'app/entities/job-application/job-application.service';

describe('Component Tests', () => {
    describe('JobApplication Management Delete Component', () => {
        let comp: JobApplicationDeleteDialogComponent;
        let fixture: ComponentFixture<JobApplicationDeleteDialogComponent>;
        let service: JobApplicationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HrDataTestModule],
                declarations: [JobApplicationDeleteDialogComponent]
            })
                .overrideTemplate(JobApplicationDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(JobApplicationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobApplicationService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
