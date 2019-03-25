import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ICandidate } from 'app/shared/model/candidate.model';
import { CandidateService } from './candidate.service';

@Component({
    selector: 'jhi-candidate-update',
    templateUrl: './candidate-update.component.html'
})
export class CandidateUpdateComponent implements OnInit {
    candidate: ICandidate;
    isSaving: boolean;

    constructor(protected candidateService: CandidateService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ candidate }) => {
            this.candidate = candidate;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.candidate.id !== undefined) {
            this.subscribeToSaveResponse(this.candidateService.update(this.candidate));
        } else {
            this.subscribeToSaveResponse(this.candidateService.create(this.candidate));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICandidate>>) {
        result.subscribe((res: HttpResponse<ICandidate>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
