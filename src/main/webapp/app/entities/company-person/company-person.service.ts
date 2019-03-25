import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICompanyPerson } from 'app/shared/model/company-person.model';

type EntityResponseType = HttpResponse<ICompanyPerson>;
type EntityArrayResponseType = HttpResponse<ICompanyPerson[]>;

@Injectable({ providedIn: 'root' })
export class CompanyPersonService {
    public resourceUrl = SERVER_API_URL + 'api/company-people';

    constructor(protected http: HttpClient) {}

    create(companyPerson: ICompanyPerson): Observable<EntityResponseType> {
        return this.http.post<ICompanyPerson>(this.resourceUrl, companyPerson, { observe: 'response' });
    }

    update(companyPerson: ICompanyPerson): Observable<EntityResponseType> {
        return this.http.put<ICompanyPerson>(this.resourceUrl, companyPerson, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICompanyPerson>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICompanyPerson[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
