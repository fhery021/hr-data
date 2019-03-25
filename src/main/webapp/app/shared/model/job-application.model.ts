import { ICandidate } from 'app/shared/model/candidate.model';
import { IJob } from 'app/shared/model/job.model';

export interface IJobApplication {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    attachmentContentType?: string;
    attachment?: any;
    candidate?: ICandidate;
    job?: IJob;
}

export class JobApplication implements IJobApplication {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public phone?: string,
        public address?: string,
        public attachmentContentType?: string,
        public attachment?: any,
        public candidate?: ICandidate,
        public job?: IJob
    ) {}
}
