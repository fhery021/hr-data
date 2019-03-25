import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IJobApplication } from 'app/shared/model/job-application.model';

type EntityResponseType = HttpResponse<IJobApplication>;
type EntityArrayResponseType = HttpResponse<IJobApplication[]>;

@Injectable({ providedIn: 'root' })
export class JobApplicationService {
    public resourceUrl = SERVER_API_URL + 'api/job-applications';

    constructor(protected http: HttpClient) {}

    create(jobApplication: IJobApplication): Observable<EntityResponseType> {
        return this.http.post<IJobApplication>(this.resourceUrl, jobApplication, { observe: 'response' });
    }

    update(jobApplication: IJobApplication): Observable<EntityResponseType> {
        return this.http.put<IJobApplication>(this.resourceUrl, jobApplication, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IJobApplication>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IJobApplication[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
