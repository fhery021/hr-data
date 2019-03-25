import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HrDataSharedModule } from 'app/shared';
import {
    CompanyPersonComponent,
    CompanyPersonDetailComponent,
    CompanyPersonUpdateComponent,
    CompanyPersonDeletePopupComponent,
    CompanyPersonDeleteDialogComponent,
    companyPersonRoute,
    companyPersonPopupRoute
} from './';

const ENTITY_STATES = [...companyPersonRoute, ...companyPersonPopupRoute];

@NgModule({
    imports: [HrDataSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CompanyPersonComponent,
        CompanyPersonDetailComponent,
        CompanyPersonUpdateComponent,
        CompanyPersonDeleteDialogComponent,
        CompanyPersonDeletePopupComponent
    ],
    entryComponents: [
        CompanyPersonComponent,
        CompanyPersonUpdateComponent,
        CompanyPersonDeleteDialogComponent,
        CompanyPersonDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HrDataCompanyPersonModule {}
