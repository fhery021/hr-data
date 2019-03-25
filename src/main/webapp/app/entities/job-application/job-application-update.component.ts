import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IJobApplication } from 'app/shared/model/job-application.model';
import { JobApplicationService } from './job-application.service';
import { ICandidate } from 'app/shared/model/candidate.model';
import { CandidateService } from 'app/entities/candidate';
import { IJob } from 'app/shared/model/job.model';
import { JobService } from 'app/entities/job';

@Component({
    selector: 'jhi-job-application-update',
    templateUrl: './job-application-update.component.html'
})
export class JobApplicationUpdateComponent implements OnInit {
    jobApplication: IJobApplication;
    isSaving: boolean;

    candidates: ICandidate[];

    jobs: IJob[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected jobApplicationService: JobApplicationService,
        protected candidateService: CandidateService,
        protected jobService: JobService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ jobApplication }) => {
            this.jobApplication = jobApplication;
        });
        this.candidateService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICandidate[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICandidate[]>) => response.body)
            )
            .subscribe((res: ICandidate[]) => (this.candidates = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.jobService
            .query({ filter: 'jobapplication-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IJob[]>) => mayBeOk.ok),
                map((response: HttpResponse<IJob[]>) => response.body)
            )
            .subscribe(
                (res: IJob[]) => {
                    if (!this.jobApplication.job || !this.jobApplication.job.id) {
                        this.jobs = res;
                    } else {
                        this.jobService
                            .find(this.jobApplication.job.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IJob>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IJob>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IJob) => (this.jobs = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.jobApplication.id !== undefined) {
            this.subscribeToSaveResponse(this.jobApplicationService.update(this.jobApplication));
        } else {
            this.subscribeToSaveResponse(this.jobApplicationService.create(this.jobApplication));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobApplication>>) {
        result.subscribe((res: HttpResponse<IJobApplication>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCandidateById(index: number, item: ICandidate) {
        return item.id;
    }

    trackJobById(index: number, item: IJob) {
        return item.id;
    }
}
