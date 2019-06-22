import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Methodology, MethodologyProperties } from 'app/shared/models/methodology.model';
import { NgxsForm } from 'app/shared/models/ngxs-form.model';
import { ElectronService } from 'app/shared/services/electron.service';
import { environment } from 'environments/environment';
import { Guid } from 'guid-typescript';
import { LoadMethodology, LoadMethodologyList, NewMethodology, UpdateMethodologyList } from './methodology.action';

const STRING_NEW_METHODOLOGY: string = 'New Methodology';

// state model
export interface MethodologyStateModel {
    methodology: Methodology;
    methodologyList: Array<MethodologyProperties>;
    methodologyForm: NgxsForm;
}

// state class
@State<MethodologyStateModel>({
    name: 'methodologyState',
    defaults: {
        methodology: null,
        methodologyList: [],
        methodologyForm: {
            model: undefined,
            dirty: false,
            status: '',
            errors: {}
        }
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

    @Selector() static methodologyForm(state: MethodologyStateModel): Methodology {
        return state.methodologyForm.model;
    }

    // actions
    @Action(NewMethodology) newMethodology(context: StateContext<MethodologyStateModel>, { payload }: NewMethodology): void {
        // get state
        const state: MethodologyStateModel = context.getState();
        // create the new methodology
        const newMethodology: Methodology = { id: Guid.raw(), path: payload.path, dateCreated: new Date(), methodologyName: STRING_NEW_METHODOLOGY };
        // add methodology to list
        const methodologyList: Array<MethodologyProperties> = [...state.methodologyList, newMethodology];
        // patch state
        context.patchState({
            methodology: newMethodology,
            methodologyList: [...methodologyList]
        });
        // write to file
        this.saveMethodology(newMethodology);
        this.saveMethodologyProperties(methodologyList);
    }

    @Action(LoadMethodology) loadMethodology({ patchState }: StateContext<MethodologyStateModel>, { payload }: LoadMethodology): void {
        this.electronService.fs.readFile(payload.path, 'utf8', (err: NodeJS.ErrnoException, data: string) => {
            // file doesn't exist, do nothing
            if (err) alert(err.message);
            // parse the data read from file
            const methodology: Methodology = !!data ? JSON.parse(data) : null;
            // patch th methodology list into the state
            patchState({ methodology });
        });
    }

    @Action(LoadMethodologyList) loadMethodologyList({ patchState }: StateContext<MethodologyStateModel>): void {
        this.electronService.fs.readFile(`${this.electronService.userDataPath()}\\${environment.methodologiesFileName}`, 'utf8', (err: NodeJS.ErrnoException, data: string) => {
            // file doesn't exist, do nothing
            if (err) alert(err.message);
            // parse the data read from file
            const methodologyList: Array<MethodologyProperties> = JSON.parse(data) as Array<MethodologyProperties>;
            // first load methodology
            if (methodologyList.length) this.store.dispatch(new LoadMethodology({ path: methodologyList[0].path }));
            // patch th methodology list into the state
            patchState({ methodologyList });
        });
    }

    @Action(UpdateMethodologyList) updateMethodologyList(context: StateContext<MethodologyStateModel>, { payload }: UpdateMethodologyList): void {
        // if no methodology, return
        if (!payload.methodology || !payload.methodology.id) return;
        // update methodology properties list based on methodology details
        const methodologyList: Array<MethodologyProperties> = context.getState().methodologyList;
        const index: number = methodologyList.findIndex((methodology: MethodologyProperties) => methodology.id === payload.methodology.id);
        // not speading into the object to drop irrelevant properties. // TODO: simplify
        methodologyList[index] = {
            id: payload.methodology.id,
            path: payload.methodology.path,
            methodologyName: payload.methodology.methodologyName
        };
        // patch state
        context.patchState({
            methodologyList: [...methodologyList]
        });
        // write the methodologyList to file
        this.saveMethodologyProperties(methodologyList);
    }

    // @Action(NewMethodologySection) newMethodologySection(context: StateContext<MethodologyStateModel>): void {
    //     // get state
    //     const state: MethodologyStateModel = context.getState();
    //     const methodology: Methodology = state.methodology;
    //     // create the new methodology
    //     const newMethodologySection: MethodologySection = { id: Guid.create() };
    //     // add methodology section to list
    //     methodology.sections.push(newMethodologySection);
    //     // patch state
    //     context.patchState({ methodology });
    //     // write to file
    //     this.saveMethodology(methodology);
    // }

    // @Action(UpdateMethodology) updateMethodology(context: StateContext<MethodologyStateModel>, { payload }: UpdateMethodology): void {
    //     // update methodology properties list based on methodology details
    //     const methodologyList: Array<MethodologyProperties> = context.getState().methodologyList;
    //     const index: number = methodologyList.findIndex((methodology: MethodologyProperties) => methodology.path === payload.methodology.path);
    //     // not speading into the object to drop irrelevant properties. // TODO: simplify
    //     methodologyList[index] = {
    //         id: payload.methodology.id,
    //         path: payload.methodology.path,
    //         methodologyName: payload.methodology.methodologyName
    //     };
    //     // patch state
    //     context.patchState({
    //         methodology: payload.methodology,
    //         methodologyList: [...methodologyList]
    //     });
    //     // write the methodologyList to file
    //     this.saveMethodology(payload.methodology);
    //     this.saveMethodologyProperties(methodologyList);
    // }

    constructor(private readonly electronService: ElectronService, private readonly store: Store) {
        /**
         * listen to form changes and write to file
         */
        store.select(MethodologyState.methodologyForm).subscribe((methodology: Methodology) => {
            if (!!methodology) {
                // update the methodology list
                store.dispatch(new UpdateMethodologyList({ methodology }));
                // write the methodology to file
                this.saveMethodology(methodology);
            }
        });
    }

    /**
     * save the current methodology to file
     * @param methodology methodology to be saved
     */
    private saveMethodology(methodology: Methodology): void {
        const savePayload: Methodology | Object = methodology ? methodology : {};
        if (!!methodology && methodology.path)
            this.electronService.fs.writeFile(methodology.path, JSON.stringify(savePayload), (err: NodeJS.ErrnoException) => {
                // user cancelled or something failed, abort
                if (err) alert(err.message);
            });
    }

    /**
     * save the list of methodologies to file
     * @param methodologyList the methodology list to be saved
     */
    private saveMethodologyProperties(methodologyList: Array<MethodologyProperties>): void {
        this.electronService.fs.writeFile(`${this.electronService.userDataPath()}\\${environment.methodologiesFileName}`, JSON.stringify(methodologyList), (err: NodeJS.ErrnoException) => {
            // user cancelled or something failed, abort
            if (err) alert(err.message);
        });
    }
}
