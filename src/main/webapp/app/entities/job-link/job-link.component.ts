import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IJobLink } from 'app/shared/model/job-link.model';
import { AccountService } from 'app/core';
import { JobLinkService } from './job-link.service';

@Component({
    selector: 'jhi-job-link',
    templateUrl: './job-link.component.html'
})
export class JobLinkComponent implements OnInit, OnDestroy {
    jobLinks: IJobLink[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected jobLinkService: JobLinkService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.jobLinkService
            .query()
            .pipe(
                filter((res: HttpResponse<IJobLink[]>) => res.ok),
                map((res: HttpResponse<IJobLink[]>) => res.body)
            )
            .subscribe(
                (res: IJobLink[]) => {
                    this.jobLinks = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInJobLinks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IJobLink) {
        return item.id;
    }

    registerChangeInJobLinks() {
        this.eventSubscriber = this.eventManager.subscribe('jobLinkListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
