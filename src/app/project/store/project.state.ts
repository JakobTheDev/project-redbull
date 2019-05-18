import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { LoadProject, LoadProjectList, NewProject, UpdateProject } from 'app/project/store/project.action';
import { Project, ProjectProperties } from 'app/shared/models/project.model';
import { ElectronService } from 'app/shared/services/electron.service';
import { environment } from 'environments/environment';
import { Guid } from 'guid-typescript';

// state model
export interface ProjectStateModel {
    project: Project;
    projectList: Array<ProjectProperties>;
}

// state class
@State<ProjectStateModel>({
    name: 'projectState',
    defaults: {
        project: null,
        projectList: []
    }
})
export class ProjectState {
    // selectors
    @Selector() static project(state: ProjectStateModel): Project {
        return state.project;
    }

    @Selector() static projectList(state: ProjectStateModel): Array<ProjectProperties> {
        return state.projectList;
    }

    // actions
    @Action(NewProject) newProject(context: StateContext<ProjectStateModel>, { payload }: NewProject): void {
        // get state
        const state: ProjectStateModel = context.getState();
        // create the new project
        const newProject: Project = { id: Guid.create(), path: payload.path, dateCreated: new Date() };
        // add project to list
        const projectList: Array<ProjectProperties> = [...state.projectList, newProject];
        // patch state
        context.setState({
            project: newProject,
            projectList: [...projectList]
        });
        // write to file
        // write the projects to file
        this.saveProject(newProject);
        this.saveProjectProperties(projectList);
    }

    @Action(LoadProject) loadProject({ patchState }: StateContext<ProjectStateModel>, { payload }: LoadProject): void {
        this.electronService.fs.readFile(payload.projectProperties.path, 'utf8', (err: NodeJS.ErrnoException, data: string) => {
            // file doesn't exist, do nothing
            if (err) return;
            // parse the data read from file
            const project: Project = JSON.parse(data) as Project;
            // patch th project list into the state
            patchState({ project });
        });
    }

    @Action(UpdateProject) updateProject(context: StateContext<ProjectStateModel>, { payload }: UpdateProject): void {
        // update project properties list based on project details
        const projectList: Array<ProjectProperties> = context.getState().projectList;
        const index: number = projectList.findIndex((project: ProjectProperties) => project.path === payload.project.path);
        // construct project title
        payload.project.projectTitle = this.getProjectTitle(payload.project);
        // not speading into the object to drop irrelevant properties. // TODO: simplify
        projectList[index] = {
            id: payload.project.id,
            path: payload.project.path,
            clientName: payload.project.clientName,
            projectName: payload.project.projectName,
            projectNumber: payload.project.projectNumber,
            projectTitle: payload.project.projectTitle
        };
        // patch state
        context.patchState({
            project: payload.project,
            projectList: [...projectList]
        });
        // write the projects to file
        this.saveProject(payload.project);
        this.saveProjectProperties(projectList);
    }

    @Action(LoadProjectList) loadProjectList({ patchState }: StateContext<ProjectStateModel>): void {
        this.electronService.fs.readFile(`${this.electronService.userDataPath()}\\${environment.projectsFileName}`, 'utf8', (err: NodeJS.ErrnoException, data: string) => {
            // file doesn't exist, do nothing
            if (err) return;
            // parse the data read from file
            const projectList: Array<ProjectProperties> = JSON.parse(data) as Array<ProjectProperties>;
            // first load project
            if (projectList.length) this.store.dispatch(new LoadProject({ projectProperties: projectList[0] }));
            // patch th project list into the state
            patchState({ projectList });
        });
    }

    constructor(private readonly electronService: ElectronService, private readonly store: Store) {}

    private getProjectTitle(project: Project): string {
        if (!project) return '';
        // construct title (yuck)
        let title: string = project.projectNumber ? `[${project.projectNumber}]` : ''; // project number
        title = project.projectNumber && project.clientName ? `${title} ` : `${title}`; // space separator
        title = project.clientName ? `${title}${project.clientName}` : `${title}`; // client name
        title = project.clientName && project.projectName ? `${title} - ` : `${title}`; // separator
        title = project.projectName ? `${title}${project.projectName}` : `${title}`; // project name
        return title;
    }

    private saveProject(project: Project): void {
        const savePayload: Project | Object = project ? project : {};
        this.electronService.fs.writeFile(project.path, JSON.stringify(savePayload), (err: NodeJS.ErrnoException) => {
            // user cancelled or something failed, abort
            if (err) alert(err.message);
        });
    }

    private saveProjectProperties(projects: Array<ProjectProperties>): void {
        this.electronService.fs.writeFile(`${this.electronService.userDataPath()}\\${environment.projectsFileName}`, JSON.stringify(projects), (err: NodeJS.ErrnoException) => {
            // user cancelled or something failed, abort
            if (err) alert(err.message);
        });
    }
}
