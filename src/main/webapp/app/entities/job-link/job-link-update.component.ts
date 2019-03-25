import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IJobLink } from 'app/shared/model/job-link.model';
import { JobLinkService } from './job-link.service';

@Component({
    selector: 'jhi-job-link-update',
    templateUrl: './job-link-update.component.html'
})
export class JobLinkUpdateComponent implements OnInit {
    jobLink: IJobLink;
    isSaving: boolean;

    constructor(protected jobLinkService: JobLinkService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ jobLink }) => {
            this.jobLink = jobLink;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.jobLink.id !== undefined) {
            this.subscribeToSaveResponse(this.jobLinkService.update(this.jobLink));
        } else {
            this.subscribeToSaveResponse(this.jobLinkService.create(this.jobLink));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobLink>>) {
        result.subscribe((res: HttpResponse<IJobLink>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
