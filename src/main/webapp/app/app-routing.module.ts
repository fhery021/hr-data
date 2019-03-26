import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

import { DashboardComponent } from 'app/dashboard';

const ROUTES: Routes = [
    {
        path: 'admin',
        loadChildren: './admin/admin.module#HrDataAdminModule'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'candidate',
        loadChildren: './entities/candidate/candidate.module#CandidateUpdateComponent'
    },
    {
        path: 'postAJob',
        loadChildren: './entities/job/job.module#JobComponent'
    },
    // {
    //     pipeLine
    // }
    // JobDetailComponent
    navbarRoute,
    ...errorRoute
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES, { useHash: true, enableTracing: DEBUG_INFO_ENABLED })],
    exports: [RouterModule]
})
export class HrDataAppRoutingModule {}
