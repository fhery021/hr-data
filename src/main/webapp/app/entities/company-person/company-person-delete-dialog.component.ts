import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICompanyPerson } from 'app/shared/model/company-person.model';
import { CompanyPersonService } from './company-person.service';

@Component({
    selector: 'jhi-company-person-delete-dialog',
    templateUrl: './company-person-delete-dialog.component.html'
})
export class CompanyPersonDeleteDialogComponent {
    companyPerson: ICompanyPerson;

    constructor(
        protected companyPersonService: CompanyPersonService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.companyPersonService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'companyPersonListModification',
                content: 'Deleted an companyPerson'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-company-person-delete-popup',
    template: ''
})
export class CompanyPersonDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ companyPerson }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CompanyPersonDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.companyPerson = companyPerson;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/company-person', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/company-person', { outlets: { popup: null } }]);
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
