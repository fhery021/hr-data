import { Moment } from 'moment';
import { ICompanyPerson } from 'app/shared/model/company-person.model';
import { IJobLink } from 'app/shared/model/job-link.model';

export interface IJob {
    id?: number;
    title?: string;
    location?: string;
    startDate?: Moment;
    description?: string;
    companyPerson?: ICompanyPerson;
    jobLink?: IJobLink;
}

export class Job implements IJob {
    constructor(
        public id?: number,
        public title?: string,
        public location?: string,
        public startDate?: Moment,
        public description?: string,
        public companyPerson?: ICompanyPerson,
        public jobLink?: IJobLink
    ) {}
}
