import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CompanyPerson } from 'app/shared/model/company-person.model';
import { CompanyPersonService } from './company-person.service';
import { CompanyPersonComponent } from './company-person.component';
import { CompanyPersonDetailComponent } from './company-person-detail.component';
import { CompanyPersonUpdateComponent } from './company-person-update.component';
import { CompanyPersonDeletePopupComponent } from './company-person-delete-dialog.component';
import { ICompanyPerson } from 'app/shared/model/company-person.model';

@Injectable({ providedIn: 'root' })
export class CompanyPersonResolve implements Resolve<ICompanyPerson> {
    constructor(private service: CompanyPersonService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICompanyPerson> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CompanyPerson>) => response.ok),
                map((companyPerson: HttpResponse<CompanyPerson>) => companyPerson.body)
            );
        }
        return of(new CompanyPerson());
    }
}

export const companyPersonRoute: Routes = [
    {
        path: '',
        component: CompanyPersonComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanyPeople'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CompanyPersonDetailComponent,
        resolve: {
            companyPerson: CompanyPersonResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanyPeople'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CompanyPersonUpdateComponent,
        resolve: {
            companyPerson: CompanyPersonResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanyPeople'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CompanyPersonUpdateComponent,
        resolve: {
            companyPerson: CompanyPersonResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanyPeople'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const companyPersonPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CompanyPersonDeletePopupComponent,
        resolve: {
            companyPerson: CompanyPersonResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanyPeople'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
