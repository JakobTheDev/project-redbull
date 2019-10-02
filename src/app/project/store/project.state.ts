import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { append, patch } from '@ngxs/store/operators';
import { LoadProject, LoadProjectList, NewProject, RemoveProject, SaveProject, SaveProjectList, UpdateProjectList } from 'app/project/store/project.action';
import { NgxsForm } from 'app/shared/models/ngxs-form.model';
import { ProjectSave } from 'app/shared/models/project-save.model';
import { Project, ProjectProperties } from 'app/shared/models/project.model';
import { ElectronService } from 'app/shared/services/electron.service';
import { TestState, TestStateModel } from 'app/test/store/test.state';
import { environment } from 'environments/environment';
import { Guid } from 'guid-typescript';

const STRING_NEW_PROJECT_TITLE: string = 'New Project';

// state model
export interface ProjectStateModel {
    project: Project;
    projectList: Array<ProjectProperties>;
    projectForm: NgxsForm;
    testState: TestStateModel;
}

// state class
@State<ProjectStateModel>({
    name: 'projectState',
    defaults: {
        project: null,
        projectList: [],
        projectForm: {
            model: undefined,
            dirty: false,
            status: '',
            errors: {}
        },
        testState: null
    },
    children: [TestState]
})
export class ProjectState {
    // selectors
    @Selector() static project(state: ProjectStateModel): Project {
        return state.project;
    }

    @Selector() static projectList(state: ProjectStateModel): Array<ProjectProperties> {
        return state.projectList;
    }

    @Selector() static projectForm(state: ProjectStateModel): Project {
        return state.projectForm.model;
    }

    // actions
    @Action(NewProject) newProject(context: StateContext<ProjectStateModel>, { payload }: NewProject): void {
        // create the new project
        const newProject: Project = { id: Guid.raw(), path: payload.path, dateCreated: new Date(), projectTitle: STRING_NEW_PROJECT_TITLE };
        // patch state
        context.setState(
            patch({
                project: newProject,
                projectList: append([newProject])
            })
        );
        // write the projects to file
        this.store.dispatch(new SaveProject());
        this.store.dispatch(new SaveProjectList());
    }

    @Action(LoadProject) loadProject({ patchState }: StateContext<ProjectStateModel>, { payload }: LoadProject): void {
        this.electronService.fs.readFile(payload.path, 'utf8', (err: NodeJS.ErrnoException, data: string) => {
            // file doesn't exist, do nothing
            if (err) return;
            // parse the data read from file
            const projectSave: ProjectSave = !!data ? JSON.parse(data) : null;
            // patch th project list into the state
            patchState({ project: projectSave.project, testState: projectSave.testState });
        });
    }

    @Action(SaveProject) saveProject(context: StateContext<ProjectStateModel>): void {
        // get the current state
        const projectState: ProjectStateModel = context.getState();
        // create the save payload
        const savePayload: ProjectSave = { project: projectState.projectForm.model, testState: projectState.testState };
        // save project to file
        if (savePayload.project)
            this.electronService.fs.writeFile(savePayload.project.path, JSON.stringify(savePayload), (err: NodeJS.ErrnoException) => {
                // user cancelled or something failed, abort
                // TODO handle errors
            });
    }

    @Action(SaveProjectList) saveProjectList(context: StateContext<ProjectStateModel>): void {
        // get the current state
        const projectState: ProjectStateModel = context.getState();
        // save project list to file
        this.electronService.fs.writeFile(`${this.electronService.userDataPath()}\\${environment.projectsFileName}`, JSON.stringify(projectState.projectList), (err: NodeJS.ErrnoException) => {
            // user cancelled or something failed, abort
            // TODO handle errors
        });
    }

    @Action(LoadProjectList) loadProjectList({ patchState }: StateContext<ProjectStateModel>): void {
        this.electronService.fs.readFile(`${this.electronService.userDataPath()}\\${environment.projectsFileName}`, 'utf8', (err: NodeJS.ErrnoException, data: string) => {
            // file doesn't exist, do nothing
            if (err) return;
            // parse the data read from file
            const projectList: Array<ProjectProperties> = JSON.parse(data) as Array<ProjectProperties>;
            // first load project
            if (projectList.length) this.store.dispatch(new LoadProject({ path: projectList[0].path }));
            // patch th project list into the state
            patchState({ projectList });
        });
    }

    @Action(UpdateProjectList) updateProjectList(context: StateContext<ProjectStateModel>, { payload }: UpdateProjectList): void {
        // update project properties list based on project details
        const projectList: Array<ProjectProperties> = context.getState().projectList;
        const index: number = projectList.findIndex((project: ProjectProperties) => project.id === payload.project.id);
        // not speading into the object to drop irrelevant properties.
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
            projectList: [...projectList]
        });
        // write the projects to file
        this.store.dispatch(new SaveProjectList());
    }

    @Action(RemoveProject) removeProject(context: StateContext<ProjectStateModel>): void {
        // update project properties list based on project details
        const currentProject: Project = context.getState().project;
        const projectList: Array<ProjectProperties> = context.getState().projectList.filter((project: ProjectProperties) => project.id !== currentProject.id);
        // patch state
        context.patchState({
            project: null,
            projectList
        });
        // write the projects to file
        this.store.dispatch(new SaveProjectList());
        // load another project
        if (projectList.length) this.store.dispatch(new LoadProject(projectList[0]));
    }

    constructor(private readonly electronService: ElectronService, private readonly store: Store) {
        /**
         * listen to form changes and write to file
         */
        store.select(ProjectState.projectForm).subscribe((project: Project) => {
            if (!!project) {
                // update the project list
                store.dispatch(new UpdateProjectList({ project }));
                // write the project to file
                this.store.dispatch(new SaveProject());
            }
        });
    }
}
