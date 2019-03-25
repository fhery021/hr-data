import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJobLink } from 'app/shared/model/job-link.model';
import { JobLinkService } from './job-link.service';

@Component({
    selector: 'jhi-job-link-delete-dialog',
    templateUrl: './job-link-delete-dialog.component.html'
})
export class JobLinkDeleteDialogComponent {
    jobLink: IJobLink;

    constructor(protected jobLinkService: JobLinkService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jobLinkService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'jobLinkListModification',
                content: 'Deleted an jobLink'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-job-link-delete-popup',
    template: ''
})
export class JobLinkDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ jobLink }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(JobLinkDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.jobLink = jobLink;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/job-link', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/job-link', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
