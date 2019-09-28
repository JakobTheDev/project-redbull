import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { LoadMethodology } from 'app/methodology/store/methodology.action';
import { MethodologyState } from 'app/methodology/store/methodology.state';
import { MethodologyProperties } from 'app/shared/models/methodology.model';
import { Test } from 'app/shared/models/test.model';
import { ElectronService } from 'app/shared/services/electron.service';
import { NewTest } from 'app/test/store/test.action';
import { TestState } from 'app/test/store/test.state';
import { Observable } from 'rxjs';

@Component({
    selector: 'redbull-test-sidebar',
    templateUrl: './test-sidebar.component.html',
    styleUrls: ['./test-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestSidebarComponent {
    /**
     * store observables
     */
    methodologyList$: Observable<Array<MethodologyProperties>>;
    testList$: Observable<Array<Test>>;

    /**
     * handles the 'new test' modal
     */
    showNewTestModal: boolean;

    /**
     * form for the test sidebar
     */
    testForm: FormGroup = new FormGroup({
        methodology: new FormControl(null)
    });

    constructor(private readonly electronService: ElectronService, private readonly store: Store) {
        // set up store observables
        this.methodologyList$ = this.store.select(MethodologyState.methodologyList);
        this.testList$ = this.store.select(TestState.testList);
        // set up form observables
        this.testForm.controls.methodology.valueChanges.subscribe((id: any) => {
            this.store.dispatch(new LoadMethodology({ id }));
        });
    }

    /**
     * create a new test
     */
    newTest(): void {
        // show modal
        this.showNewTestModal = true;
    }

    /**
     * handler for modal 'cancel' button
     */
    onModalCancel(): void {
        // hide modal
        this.showNewTestModal = false;
    }

    /**
     * handler for modal 'create' button
     */
    onModalCreate(): void {
        // hide modal
        this.showNewTestModal = false;
        // create the test
        this.store.dispatch(new NewTest());
    }

    /**
     * trackBy functions
     */
    trackByMethodology = (index: number, methodologyProperties: MethodologyProperties) => methodologyProperties.id;
    trackByTest = (index: number, test: Test) => test.id;
}
