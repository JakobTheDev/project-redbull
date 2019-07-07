import { Project } from 'app/shared/models/project.model';

export class NewProject {
    static readonly type: string = '[Project] New Project';
    constructor(readonly payload: { path: string }) {}
}

export class LoadProject {
    static readonly type: string = '[Project] Load Project';
    constructor(readonly payload: { path: string }) {}
}

export class SaveProject {
    static readonly type: string = '[Project] Save Project';
}

export class LoadProjectList {
    static readonly type: string = '[Project] Load Project List';
}

export class SaveProjectList {
    static readonly type: string = '[Project] Save Project List';
}

export class UpdateProjectList {
    static readonly type: string = '[Project] Update Project List';
    constructor(readonly payload: { project: Project }) {}
}

export class RemoveProject {
    static readonly type: string = '[Project] Remove Project';
}
