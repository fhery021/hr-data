import { IJobApplication } from 'app/shared/model/job-application.model';

export interface ICandidate {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    mobile?: string;
    companyName?: string;
    jobApplications?: IJobApplication[];
}

export class Candidate implements ICandidate {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public mobile?: string,
        public companyName?: string,
        public jobApplications?: IJobApplication[]
    ) {}
}
