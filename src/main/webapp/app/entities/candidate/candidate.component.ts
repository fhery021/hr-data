import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICandidate } from 'app/shared/model/candidate.model';
import { AccountService } from 'app/core';
import { CandidateService } from './candidate.service';

@Component({
    selector: 'jhi-candidate',
    templateUrl: './candidate.component.html'
})
export class CandidateComponent implements OnInit, OnDestroy {
    candidates: ICandidate[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected candidateService: CandidateService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.candidateService
            .query()
            .pipe(
                filter((res: HttpResponse<ICandidate[]>) => res.ok),
                map((res: HttpResponse<ICandidate[]>) => res.body)
            )
            .subscribe(
                (res: ICandidate[]) => {
                    this.candidates = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCandidates();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICandidate) {
        return item.id;
    }

    registerChangeInCandidates() {
        this.eventSubscriber = this.eventManager.subscribe('candidateListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
