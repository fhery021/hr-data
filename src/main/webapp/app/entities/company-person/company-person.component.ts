import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICompanyPerson } from 'app/shared/model/company-person.model';
import { AccountService } from 'app/core';
import { CompanyPersonService } from './company-person.service';

@Component({
    selector: 'jhi-company-person',
    templateUrl: './company-person.component.html'
})
export class CompanyPersonComponent implements OnInit, OnDestroy {
    companyPeople: ICompanyPerson[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected companyPersonService: CompanyPersonService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.companyPersonService
            .query()
            .pipe(
                filter((res: HttpResponse<ICompanyPerson[]>) => res.ok),
                map((res: HttpResponse<ICompanyPerson[]>) => res.body)
            )
            .subscribe(
                (res: ICompanyPerson[]) => {
                    this.companyPeople = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCompanyPeople();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICompanyPerson) {
        return item.id;
    }

    registerChangeInCompanyPeople() {
        this.eventSubscriber = this.eventManager.subscribe('companyPersonListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
