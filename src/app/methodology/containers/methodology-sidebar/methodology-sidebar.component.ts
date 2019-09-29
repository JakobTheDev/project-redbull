import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoadMethodology, NewMethodology } from 'app/methodology/store/methodology.action';
import { MethodologyState } from 'app/methodology/store/methodology.state';
import { methodologyFileFilters } from 'app/shared/models/file-filters.model';
import { Methodology, MethodologyProperties } from 'app/shared/models/methodology.model';
import { ElectronService } from 'app/shared/services/electron.service';
import { SaveDialogReturnValue } from 'electron';
import { Observable } from 'rxjs';

@Component({
    selector: 'redbull-methodology-sidebar',
    templateUrl: './methodology-sidebar.component.html',
    styleUrls: ['./methodology-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MethodologySidebarComponent {
    // store observables
    methodology$: Observable<Methodology>;
    methodologyList$: Observable<Array<MethodologyProperties>>;

    constructor(private readonly electronService: ElectronService, private readonly store: Store) {
        this.methodology$ = this.store.select(MethodologyState.methodology);
        this.methodologyList$ = this.store.select(MethodologyState.methodologyList);
    }

    /**
     * create a new methodology
     */
    newMethodology(): void {
        this.electronService.remote.dialog.showSaveDialog({ filters: methodologyFileFilters }).then((saveDialogReturnValue: SaveDialogReturnValue) => {
            // user cancelled or something failed, abort
            if (saveDialogReturnValue.canceled || saveDialogReturnValue.filePath === undefined) {
                return undefined;
            }
            // create the new methodology file
            this.electronService.fs.writeFile(saveDialogReturnValue.filePath, '', (err: any) => {
                // user cancelled or something failed, abort
                // TODO handle errors
                // save new methodology to the store
                this.store.dispatch(new NewMethodology({ path: saveDialogReturnValue.filePath }));
            });
        });
    }

    /**
     * hanlde methodology click event
     * @param methodologyProperties properties of the selected methodology
     */
    onMethodologySelected(methodologyProperties: MethodologyProperties): void {
        // load methodology
        this.store.dispatch(new LoadMethodology({ id: methodologyProperties.id }));
    }

    /**
     * trackby funciton for methodology list
     */
    trackByMethodology = (index: number, methodologyProperties: MethodologyProperties) => methodologyProperties.path;
}
