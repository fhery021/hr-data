import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HrDataSharedModule } from 'app/shared';
import {
    JobApplicationComponent,
    JobApplicationDetailComponent,
    JobApplicationUpdateComponent,
    JobApplicationDeletePopupComponent,
    JobApplicationDeleteDialogComponent,
    jobApplicationRoute,
    jobApplicationPopupRoute
} from './';

const ENTITY_STATES = [...jobApplicationRoute, ...jobApplicationPopupRoute];

@NgModule({
    imports: [HrDataSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        JobApplicationComponent,
        JobApplicationDetailComponent,
        JobApplicationUpdateComponent,
        JobApplicationDeleteDialogComponent,
        JobApplicationDeletePopupComponent
    ],
    entryComponents: [
        JobApplicationComponent,
        JobApplicationUpdateComponent,
        JobApplicationDeleteDialogComponent,
        JobApplicationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HrDataJobApplicationModule {}
