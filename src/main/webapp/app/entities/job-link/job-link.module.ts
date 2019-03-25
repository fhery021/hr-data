import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HrDataSharedModule } from 'app/shared';
import {
    JobLinkComponent,
    JobLinkDetailComponent,
    JobLinkUpdateComponent,
    JobLinkDeletePopupComponent,
    JobLinkDeleteDialogComponent,
    jobLinkRoute,
    jobLinkPopupRoute
} from './';

const ENTITY_STATES = [...jobLinkRoute, ...jobLinkPopupRoute];

@NgModule({
    imports: [HrDataSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        JobLinkComponent,
        JobLinkDetailComponent,
        JobLinkUpdateComponent,
        JobLinkDeleteDialogComponent,
        JobLinkDeletePopupComponent
    ],
    entryComponents: [JobLinkComponent, JobLinkUpdateComponent, JobLinkDeleteDialogComponent, JobLinkDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HrDataJobLinkModule {}
