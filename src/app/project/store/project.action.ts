import { Project } from 'app/shared/models/project.model';

// update project actions
export class UpdateProject {
    static readonly type: string = '[Project] Update Project';
    constructor(readonly payload: { project: Project }) {}
}
