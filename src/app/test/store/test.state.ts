import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { append, patch } from '@ngxs/store/operators';
import { MethodologyState } from 'app/methodology/store/methodology.state';
import { Methodology } from 'app/shared/models/methodology.model';
import { Test } from 'app/shared/models/test.model';
import { Guid } from 'guid-typescript';
import { NewTest } from './test.action';

// state model
export interface TestStateModel {
    testList: Array<Test>;
}

// state class
@State<TestStateModel>({
    name: 'testState',
    defaults: {
        testList: []
    }
})
export class TestState {
    // selectors
    @Selector() static testList(state: TestStateModel): any {
        return state.testList;
    }

    // actions
    @Action(NewTest) newTest(context: StateContext<TestStateModel>): void {
        // get the methodology from the store
        const methodology: Methodology = this.store.selectSnapshot(MethodologyState.methodology);
        // create the new test
        const newTest: Test = { ...methodology, id: Guid.raw(), name: methodology.name };
        // patch state
        context.setState(
            patch({
                testList: append([newTest])
            })
        );
        // // write to file
        // // write the projects to file
        // this.saveProject(newProject);
        // this.saveProjectProperties(projectList);
    }

    constructor(private readonly store: Store) {}
}
