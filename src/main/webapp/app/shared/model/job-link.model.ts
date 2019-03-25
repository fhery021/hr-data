import { IJob } from 'app/shared/model/job.model';

export interface IJobLink {
    id?: number;
    link?: string;
    jobs?: IJob[];
}

export class JobLink implements IJobLink {
    constructor(public id?: number, public link?: string, public jobs?: IJob[]) {}
}
