import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { append, patch } from '@ngxs/store/operators';
import { MethodologyState } from 'app/methodology/store/methodology.state';
import { Methodology, MethodologySection, MethodologyTask } from 'app/shared/models/methodology.model';
import { Test } from 'app/shared/models/test.model';
import { Guid } from 'guid-typescript';
import { NewTest, SelectSection, SelectTask, SelectTest, UpdateTaskNotes } from './test.action';

// state model
export interface TestStateModel {
    testList: Array<Test>;
    selectedTestID: string;
    selectedSectionID: string;
    selectedTaskID: string;
}

// state class
@State<TestStateModel>({
    name: 'testState',
    defaults: {
        testList: [],
        selectedTestID: null,
        selectedSectionID: null,
        selectedTaskID: null
    }
})
export class TestState {
    // selectors
    @Selector() static testList(state: TestStateModel): any {
        return state.testList;
    }

    @Selector() static test(state: TestStateModel): any {
        return state.testList.find((test: Test) => test.id === state.selectedTestID);
    }

    @Selector() static section(state: TestStateModel): any {
        let section: MethodologySection;
        state.testList.forEach((test: Test) => {
            const matchedSection: MethodologySection = test.sections.find((sec: MethodologySection) => sec.id === state.selectedSectionID);
            section = !!matchedSection ? matchedSection : section;
        });
        return section;
    }

    @Selector() static task(state: TestStateModel): any {
        let task: MethodologyTask;
        state.testList.forEach((test: Test) => {
            test.sections.forEach((section: MethodologySection) => {
                const matchedTask: MethodologyTask = section.tasks.find((t: MethodologyTask) => t.id === state.selectedTaskID);
                task = !!matchedTask ? matchedTask : task;
            });
        });
        return task;
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
    }

    @Action(SelectTest) selectTest({ patchState }: StateContext<TestStateModel>, { payload }: SelectTest): void {
        patchState({ selectedTestID: payload.id });
    }

    @Action(SelectSection) selectSection({ patchState }: StateContext<TestStateModel>, { payload }: SelectSection): void {
        patchState({ selectedSectionID: payload.id });
    }

    @Action(SelectTask) selectTask({ patchState }: StateContext<TestStateModel>, { payload }: SelectTask): void {
        patchState({ selectedTaskID: payload.id });
    }

    @Action(UpdateTaskNotes) updateTaskNotes(context: StateContext<TestStateModel>, { payload }: UpdateTaskNotes): void {
        // get the current state
        const testState: TestStateModel = context.getState();
        // update the task
        const updatedTestList: Array<Test> = testState.testList.map((test: Test) =>
            Object.assign({
                ...test,
                sections: test.sections.map((section: MethodologySection) =>
                    Object.assign({
                        ...section,
                        tasks: section.tasks.map((task: MethodologyTask) =>
                            Object.assign({
                                ...task,
                                taskNotes: task.id === payload.id ? payload.testNotes : task.testNotes
                            })
                        )
                    })
                )
            })
        );
        // patch state
        context.setState(
            patch({
                testList: updatedTestList
            })
        );
    }

    constructor(private readonly store: Store) {}
}
