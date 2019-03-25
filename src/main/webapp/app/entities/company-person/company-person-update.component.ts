import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ICompanyPerson } from 'app/shared/model/company-person.model';
import { CompanyPersonService } from './company-person.service';

@Component({
    selector: 'jhi-company-person-update',
    templateUrl: './company-person-update.component.html'
})
export class CompanyPersonUpdateComponent implements OnInit {
    companyPerson: ICompanyPerson;
    isSaving: boolean;

    constructor(protected companyPersonService: CompanyPersonService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ companyPerson }) => {
            this.companyPerson = companyPerson;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.companyPerson.id !== undefined) {
            this.subscribeToSaveResponse(this.companyPersonService.update(this.companyPerson));
        } else {
            this.subscribeToSaveResponse(this.companyPersonService.create(this.companyPerson));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompanyPerson>>) {
        result.subscribe((res: HttpResponse<ICompanyPerson>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
