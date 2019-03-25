import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JobApplication } from 'app/shared/model/job-application.model';
import { JobApplicationService } from './job-application.service';
import { JobApplicationComponent } from './job-application.component';
import { JobApplicationDetailComponent } from './job-application-detail.component';
import { JobApplicationUpdateComponent } from './job-application-update.component';
import { JobApplicationDeletePopupComponent } from './job-application-delete-dialog.component';
import { IJobApplication } from 'app/shared/model/job-application.model';

@Injectable({ providedIn: 'root' })
export class JobApplicationResolve implements Resolve<IJobApplication> {
    constructor(private service: JobApplicationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IJobApplication> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<JobApplication>) => response.ok),
                map((jobApplication: HttpResponse<JobApplication>) => jobApplication.body)
            );
        }
        return of(new JobApplication());
    }
}

export const jobApplicationRoute: Routes = [
    {
        path: '',
        component: JobApplicationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JobApplications'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: JobApplicationDetailComponent,
        resolve: {
            jobApplication: JobApplicationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JobApplications'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: JobApplicationUpdateComponent,
        resolve: {
            jobApplication: JobApplicationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JobApplications'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: JobApplicationUpdateComponent,
        resolve: {
            jobApplication: JobApplicationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JobApplications'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jobApplicationPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: JobApplicationDeletePopupComponent,
        resolve: {
            jobApplication: JobApplicationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JobApplications'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
