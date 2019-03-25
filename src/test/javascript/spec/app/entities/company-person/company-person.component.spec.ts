/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HrDataTestModule } from '../../../test.module';
import { CompanyPersonComponent } from 'app/entities/company-person/company-person.component';
import { CompanyPersonService } from 'app/entities/company-person/company-person.service';
import { CompanyPerson } from 'app/shared/model/company-person.model';

describe('Component Tests', () => {
    describe('CompanyPerson Management Component', () => {
        let comp: CompanyPersonComponent;
        let fixture: ComponentFixture<CompanyPersonComponent>;
        let service: CompanyPersonService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HrDataTestModule],
                declarations: [CompanyPersonComponent],
                providers: []
            })
                .overrideTemplate(CompanyPersonComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompanyPersonComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyPersonService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CompanyPerson(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.companyPeople[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
