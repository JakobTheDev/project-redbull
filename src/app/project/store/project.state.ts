import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UpdateProject } from 'app/project/store/project.action';
import { Project } from 'app/shared/models/project.model';

// state model
export interface ProjectStateModel {
    project: Project;
}

// state class
@State<ProjectStateModel>({
    name: 'projectState',
    defaults: {
        project: null
    }
})
export class ProjectState {
    // selectors
    @Selector() static project(state: ProjectStateModel): Project {
        return state.project;
    }

    // actions
    @Action(UpdateProject) updateProject({ patchState }: StateContext<ProjectStateModel>, { payload }: UpdateProject): void {
        patchState({ project: payload.project });
    }

    constructor() {}
}
