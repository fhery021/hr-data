import { Route } from '@angular/router';

import { DashboardComponent } from './';

export const DASHBOARD_ROUTE: Route = {
    path: '',
    component: DashboardComponent,
    data: {
        authorities: [],
        pageTitle: 'HR Data Solutions'
    }
};
