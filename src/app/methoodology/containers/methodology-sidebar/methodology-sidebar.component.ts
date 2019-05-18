import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoadMethodology, NewMethodology } from 'app/methoodology/store/methodology.action';
import { MethodologyState } from 'app/methoodology/store/methodology.state';
import { methodologyFileFilters } from 'app/shared/models/file-filters.model';
import { Methodology, MethodologyProperties } from 'app/shared/models/methodology.model';
import { ElectronService } from 'app/shared/services/electron.service';
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

    newMethodology(): void {
        this.electronService.remote.dialog.showSaveDialog({ filters: methodologyFileFilters }, (fileName: any) => {
            // user cancelled or something failed, abort
            if (fileName === undefined) {
                return;
            }
            // create the new methodology file
            this.electronService.fs.writeFile(fileName, '', (err: any) => {
                // user cancelled or something failed, abort
                if (err) alert(err.message);
                // save new methodology to the store
                this.store.dispatch(new NewMethodology({ path: fileName }));
            });
        });
    }

    // load methodology on select
    onMethodologySelected(methodologyProperties: MethodologyProperties): void {
        this.store.dispatch(new LoadMethodology({ methodologyProperties }));
    }

    // trackBy functions
    trackByMethodology = (index: number, methodologyProperties: MethodologyProperties) => methodologyProperties.path;
}
