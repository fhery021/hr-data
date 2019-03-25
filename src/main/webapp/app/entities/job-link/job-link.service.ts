import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IJobLink } from 'app/shared/model/job-link.model';

type EntityResponseType = HttpResponse<IJobLink>;
type EntityArrayResponseType = HttpResponse<IJobLink[]>;

@Injectable({ providedIn: 'root' })
export class JobLinkService {
    public resourceUrl = SERVER_API_URL + 'api/job-links';

    constructor(protected http: HttpClient) {}

    create(jobLink: IJobLink): Observable<EntityResponseType> {
        return this.http.post<IJobLink>(this.resourceUrl, jobLink, { observe: 'response' });
    }

    update(jobLink: IJobLink): Observable<EntityResponseType> {
        return this.http.put<IJobLink>(this.resourceUrl, jobLink, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IJobLink>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IJobLink[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
