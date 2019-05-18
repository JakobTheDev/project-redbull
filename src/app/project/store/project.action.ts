import { Project, ProjectProperties } from 'app/shared/models/project.model';

// new project actions
export class NewProject {
    static readonly type: string = '[Project] New Project';
    constructor(readonly payload: { path: string }) {}
}

// load project actions
export class LoadProject {
    static readonly type: string = '[Project] Load Project';
    constructor(readonly payload: { projectProperties: ProjectProperties }) {}
}

// update project actions
export class UpdateProject {
    static readonly type: string = '[Project] Update Project';
    constructor(readonly payload: { project: Project }) {}
}

// load project list actions
export class LoadProjectList {
    static readonly type: string = '[Project] Load Project List';
    constructor() {}
}

// update project list actions
export class UpdateProjectList {
    static readonly type: string = '[Project] Update Project List';
    constructor(readonly pauload: { projectList: Project }) {}
}
