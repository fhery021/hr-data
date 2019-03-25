import { IJob } from 'app/shared/model/job.model';

export interface ICompanyPerson {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    mobile?: string;
    companyName?: string;
    title?: string;
    nrEmployees?: number;
    jobs?: IJob[];
}

export class CompanyPerson implements ICompanyPerson {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public mobile?: string,
        public companyName?: string,
        public title?: string,
        public nrEmployees?: number,
        public jobs?: IJob[]
    ) {}
}
