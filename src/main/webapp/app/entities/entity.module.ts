import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'company-person',
                loadChildren: './company-person/company-person.module#HrDataCompanyPersonModule'
            },
            {
                path: 'candidate',
                loadChildren: './candidate/candidate.module#HrDataCandidateModule'
            },
            {
                path: 'job',
                loadChildren: './job/job.module#HrDataJobModule'
            },
            {
                path: 'job-application',
                loadChildren: './job-application/job-application.module#HrDataJobApplicationModule'
            },
            {
                path: 'job-link',
                loadChildren: './job-link/job-link.module#HrDataJobLinkModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HrDataEntityModule {}
