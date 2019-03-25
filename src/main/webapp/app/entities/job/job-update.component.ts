import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IJob } from 'app/shared/model/job.model';
import { JobService } from './job.service';
import { ICompanyPerson } from 'app/shared/model/company-person.model';
import { CompanyPersonService } from 'app/entities/company-person';
import { IJobLink } from 'app/shared/model/job-link.model';
import { JobLinkService } from 'app/entities/job-link';

@Component({
    selector: 'jhi-job-update',
    templateUrl: './job-update.component.html'
})
export class JobUpdateComponent implements OnInit {
    job: IJob;
    isSaving: boolean;

    companypeople: ICompanyPerson[];

    joblinks: IJobLink[];
    startDateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected jobService: JobService,
        protected companyPersonService: CompanyPersonService,
        protected jobLinkService: JobLinkService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ job }) => {
            this.job = job;
        });
        this.companyPersonService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICompanyPerson[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICompanyPerson[]>) => response.body)
            )
            .subscribe((res: ICompanyPerson[]) => (this.companypeople = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.jobLinkService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IJobLink[]>) => mayBeOk.ok),
                map((response: HttpResponse<IJobLink[]>) => response.body)
            )
            .subscribe((res: IJobLink[]) => (this.joblinks = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.job.id !== undefined) {
            this.subscribeToSaveResponse(this.jobService.update(this.job));
        } else {
            this.subscribeToSaveResponse(this.jobService.create(this.job));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IJob>>) {
        result.subscribe((res: HttpResponse<IJob>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCompanyPersonById(index: number, item: ICompanyPerson) {
        return item.id;
    }

    trackJobLinkById(index: number, item: IJobLink) {
        return item.id;
    }
}
