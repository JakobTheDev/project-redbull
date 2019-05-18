import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Methodology, MethodologyProperties, MethodologySection, MethodologyTask } from 'app/shared/models/methodology.model';
import { ElectronService } from 'app/shared/services/electron.service';
import { environment } from 'environments/environment';
import { Guid } from 'guid-typescript';
import { LoadMethodology, LoadMethodologyList, NewMethodology, UpdateMethodology } from './methodology.action';

// state model
export interface MethodologyStateModel {
    methodology: Methodology;
    methodologyList: Array<MethodologyProperties>;
}

// state class
@State<MethodologyStateModel>({
    name: 'methodologyState',
    defaults: {
        methodology: null,
        methodologyList: []
    }
})
export class MethodologyState {
    // selectors
    @Selector() static methodology(state: MethodologyStateModel): Methodology {
        return state.methodology;
    }

    @Selector() static methodologyList(state: MethodologyStateModel): Array<MethodologyProperties> {
        return state.methodologyList;
    }

    // actions
    @Action(NewMethodology) newMethodology(context: StateContext<MethodologyStateModel>, { payload }: NewMethodology): void {
        // get state
        const state: MethodologyStateModel = context.getState();
        // create the new methodology
        const newMethodology: Methodology = { id: Guid.create(), path: payload.path, dateCreated: new Date() };
        // add methodology to list
        const methodologyList: Array<MethodologyProperties> = [...state.methodologyList, newMethodology];
        // patch state
        context.setState({
            methodology: newMethodology,
            methodologyList: [...methodologyList]
        });
        // write to file
        this.saveMethodology(newMethodology);
        this.saveMethodologyProperties(methodologyList);
    }

    @Action(LoadMethodology) loadMethodology({ patchState }: StateContext<MethodologyStateModel>, { payload }: LoadMethodology): void {
        this.electronService.fs.readFile(payload.methodologyProperties.path, 'utf8', (err: NodeJS.ErrnoException, data: string) => {
            // file doesn't exist, do nothing
            if (err) return;
            // parse the data read from file
            const methodology: Methodology = JSON.parse(data) as Methodology;
            // patch th methodology list into the state
            patchState({ methodology });
        });
    }

    @Action(UpdateMethodology) updateMethodology(context: StateContext<MethodologyStateModel>, { payload }: UpdateMethodology): void {
        // update methodology properties list based on methodology details
        const methodologyList: Array<MethodologyProperties> = context.getState().methodologyList;
        const index: number = methodologyList.findIndex((methodology: MethodologyProperties) => methodology.path === payload.methodology.path);
        // not speading into the object to drop irrelevant properties. // TODO: simplify
        methodologyList[index] = {
            id: payload.methodology.id,
            path: payload.methodology.path,
            methodologyName: payload.methodology.methodologyName
        };
        // patch state
        context.patchState({
            methodology: payload.methodology,
            methodologyList: [...methodologyList]
        });
        // write the methodologyList to file
        this.saveMethodology(payload.methodology);
        this.saveMethodologyProperties(methodologyList);
    }

    @Action(LoadMethodologyList) loadMethodologyList({ patchState }: StateContext<MethodologyStateModel>): void {
        this.electronService.fs.readFile(`${this.electronService.userDataPath()}\\${environment.methodologiesFileName}`, 'utf8', (err: NodeJS.ErrnoException, data: string) => {
            // file doesn't exist, do nothing
            if (err) return;
            // parse the data read from file
            const methodologyList: Array<MethodologyProperties> = JSON.parse(data) as Array<MethodologyProperties>;
            // first load methodology
            if (methodologyList.length) this.store.dispatch(new LoadMethodology({ methodologyProperties: methodologyList[0] }));
            // patch th methodology list into the state
            patchState({ methodologyList });
        });
    }

    constructor(private readonly electronService: ElectronService, private readonly store: Store) {}

    private saveMethodology(methodology: Methodology): void {
        const savePayload: Methodology | Object = methodology ? methodology : {};
        this.electronService.fs.writeFile(methodology.path, JSON.stringify(savePayload), (err: NodeJS.ErrnoException) => {
            // user cancelled or something failed, abort
            if (err) alert(err.message);
        });
    }

    private saveMethodologyProperties(methodologyList: Array<MethodologyProperties>): void {
        this.electronService.fs.writeFile(`${this.electronService.userDataPath()}\\${environment.methodologiesFileName}`, JSON.stringify(methodologyList), (err: NodeJS.ErrnoException) => {
            // user cancelled or something failed, abort
            if (err) alert(err.message);
        });
    }
}
