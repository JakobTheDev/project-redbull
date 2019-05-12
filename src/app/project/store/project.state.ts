import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { LoadProject, LoadProjectList, NewProject, UpdateProject } from 'app/project/store/project.action';
import { Project, ProjectProperties } from 'app/shared/models/project.model';
import { ElectronService } from 'app/shared/services/electron.service';
import { environment } from 'environments/environment';

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
        // add project to list
        const projectList: Array<ProjectProperties> = [...state.projectList, { path: payload.path, dateCreated: new Date() }];
        // write to file
        this.saveProjectProperties(projectList);
        // patch state
        context.setState({
            project: { path: payload.path },
            projectList: [...projectList]
        });
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
        projectList[index] = { path: payload.project.path, clientName: payload.project.clientName, projectName: payload.project.projectName, projectNumber: payload.project.projectNumber }; // TODO simplify
        // write the projects to file
        this.saveProject(payload.project);
        this.saveProjectProperties(projectList);
        // patch state
        context.patchState({
            project: payload.project,
            projectList: [...projectList]
        });
    }

    @Action(LoadProjectList) loadProjectList({ patchState }: StateContext<ProjectStateModel>): void {
        this.electronService.fs.readFile(`${this.electronService.userDataPath()}\\${environment.projectPropertiesFileName}`, 'utf8', (err: NodeJS.ErrnoException, data: string) => {
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

    private saveProject(project: Project): void {
        this.electronService.fs.writeFile(project.path, JSON.stringify(project), (err: NodeJS.ErrnoException) => {
            // user cancelled or something failed, abort
            if (err) alert(err.message);
        });
    }

    private saveProjectProperties(projects: Array<ProjectProperties>): void {
        this.electronService.fs.writeFile(`${this.electronService.userDataPath()}\\${environment.projectPropertiesFileName}`, JSON.stringify(projects), (err: NodeJS.ErrnoException) => {
            // user cancelled or something failed, abort
            if (err) alert(err.message);
        });
    }
}
