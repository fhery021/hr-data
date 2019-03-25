import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompanyPerson } from 'app/shared/model/company-person.model';

@Component({
    selector: 'jhi-company-person-detail',
    templateUrl: './company-person-detail.component.html'
})
export class CompanyPersonDetailComponent implements OnInit {
    companyPerson: ICompanyPerson;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ companyPerson }) => {
            this.companyPerson = companyPerson;
        });
    }

    previousState() {
        window.history.back();
    }
}
