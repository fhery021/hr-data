/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { HrDataTestModule } from '../../../test.module';
import { CompanyPersonUpdateComponent } from 'app/entities/company-person/company-person-update.component';
import { CompanyPersonService } from 'app/entities/company-person/company-person.service';
import { CompanyPerson } from 'app/shared/model/company-person.model';

describe('Component Tests', () => {
    describe('CompanyPerson Management Update Component', () => {
        let comp: CompanyPersonUpdateComponent;
        let fixture: ComponentFixture<CompanyPersonUpdateComponent>;
        let service: CompanyPersonService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HrDataTestModule],
                declarations: [CompanyPersonUpdateComponent]
            })
                .overrideTemplate(CompanyPersonUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompanyPersonUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyPersonService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new CompanyPerson(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.companyPerson = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new CompanyPerson();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.companyPerson = entity;
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
