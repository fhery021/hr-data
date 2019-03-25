import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JobLink } from 'app/shared/model/job-link.model';
import { JobLinkService } from './job-link.service';
import { JobLinkComponent } from './job-link.component';
import { JobLinkDetailComponent } from './job-link-detail.component';
import { JobLinkUpdateComponent } from './job-link-update.component';
import { JobLinkDeletePopupComponent } from './job-link-delete-dialog.component';
import { IJobLink } from 'app/shared/model/job-link.model';

@Injectable({ providedIn: 'root' })
export class JobLinkResolve implements Resolve<IJobLink> {
    constructor(private service: JobLinkService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IJobLink> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<JobLink>) => response.ok),
                map((jobLink: HttpResponse<JobLink>) => jobLink.body)
            );
        }
        return of(new JobLink());
    }
}

export const jobLinkRoute: Routes = [
    {
        path: '',
        component: JobLinkComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JobLinks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: JobLinkDetailComponent,
        resolve: {
            jobLink: JobLinkResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JobLinks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: JobLinkUpdateComponent,
        resolve: {
            jobLink: JobLinkResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JobLinks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: JobLinkUpdateComponent,
        resolve: {
            jobLink: JobLinkResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JobLinks'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jobLinkPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: JobLinkDeletePopupComponent,
        resolve: {
            jobLink: JobLinkResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JobLinks'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
