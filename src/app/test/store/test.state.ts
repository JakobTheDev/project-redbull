import { Selector, State } from '@ngxs/store';

// state model
export interface TestStateModel {
    test: any;
}

// state class
@State<TestStateModel>({
    name: 'testState',
    defaults: {
        test: null
    }
})
export class TestState {
    // selectors
    @Selector() static test(state: TestStateModel): any {
        return state.test;
    }
}
