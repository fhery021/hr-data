import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICandidate } from 'app/shared/model/candidate.model';

@Component({
    selector: 'jhi-candidate-detail',
    templateUrl: './candidate-detail.component.html'
})
export class CandidateDetailComponent implements OnInit {
    candidate: ICandidate;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ candidate }) => {
            this.candidate = candidate;
        });
    }

    previousState() {
        window.history.back();
    }
}
