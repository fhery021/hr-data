/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HrDataTestModule } from '../../../test.module';
import { CompanyPersonDetailComponent } from 'app/entities/company-person/company-person-detail.component';
import { CompanyPerson } from 'app/shared/model/company-person.model';

describe('Component Tests', () => {
    describe('CompanyPerson Management Detail Component', () => {
        let comp: CompanyPersonDetailComponent;
        let fixture: ComponentFixture<CompanyPersonDetailComponent>;
        const route = ({ data: of({ companyPerson: new CompanyPerson(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HrDataTestModule],
                declarations: [CompanyPersonDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CompanyPersonDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CompanyPersonDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.companyPerson).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
