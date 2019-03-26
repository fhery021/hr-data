import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

const ROUTES: Routes = [
    {
        path: 'admin',
        loadChildren: './admin/admin.module#HrDataAdminModule'
    },
    navbarRoute,
    ...errorRoute
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES, { useHash: true, enableTracing: DEBUG_INFO_ENABLED })],
    exports: [RouterModule]
})
export class HrDataAppRoutingModule {}
