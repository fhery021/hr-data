import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IJobLink } from 'app/shared/model/job-link.model';

@Component({
    selector: 'jhi-job-link-detail',
    templateUrl: './job-link-detail.component.html'
})
export class JobLinkDetailComponent implements OnInit {
    jobLink: IJobLink;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ jobLink }) => {
            this.jobLink = jobLink;
        });
    }

    previousState() {
        window.history.back();
    }
}
