import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJobApplication } from 'app/shared/model/job-application.model';
import { JobApplicationService } from './job-application.service';

@Component({
    selector: 'jhi-job-application-delete-dialog',
    templateUrl: './job-application-delete-dialog.component.html'
})
export class JobApplicationDeleteDialogComponent {
    jobApplication: IJobApplication;

    constructor(
        protected jobApplicationService: JobApplicationService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jobApplicationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'jobApplicationListModification',
                content: 'Deleted an jobApplication'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-job-application-delete-popup',
    template: ''
})
export class JobApplicationDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ jobApplication }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(JobApplicationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.jobApplication = jobApplication;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/job-application', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/job-application', { outlets: { popup: null } }]);
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
