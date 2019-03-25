import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IJobApplication } from 'app/shared/model/job-application.model';

@Component({
    selector: 'jhi-job-application-detail',
    templateUrl: './job-application-detail.component.html'
})
export class JobApplicationDetailComponent implements OnInit {
    jobApplication: IJobApplication;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ jobApplication }) => {
            this.jobApplication = jobApplication;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
