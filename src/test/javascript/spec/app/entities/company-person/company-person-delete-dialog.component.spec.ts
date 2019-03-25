/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { HrDataTestModule } from '../../../test.module';
import { CompanyPersonDeleteDialogComponent } from 'app/entities/company-person/company-person-delete-dialog.component';
import { CompanyPersonService } from 'app/entities/company-person/company-person.service';

describe('Component Tests', () => {
    describe('CompanyPerson Management Delete Component', () => {
        let comp: CompanyPersonDeleteDialogComponent;
        let fixture: ComponentFixture<CompanyPersonDeleteDialogComponent>;
        let service: CompanyPersonService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HrDataTestModule],
                declarations: [CompanyPersonDeleteDialogComponent]
            })
                .overrideTemplate(CompanyPersonDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CompanyPersonDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyPersonService);
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
