import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { MethodologyState } from 'app/methodology/store/methodology.state';
import { Methodology, MethodologySection, MethodologyTask } from 'app/shared/models/methodology.model';
import { Guid } from 'guid-typescript';
import { DragulaService } from 'ng2-dragula';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'redbull-methodology-details',
    templateUrl: './methodology-details.component.html',
    styleUrls: ['./methodology-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MethodologyDetailsComponent implements OnDestroy, OnInit {
    /**
     * unsubscrive brom component observables
     */
    unsubscribed$: Subject<boolean> = new Subject();

    /**
     * identifier for dragula reorder group
     */
    DRAGULA_METHODOLOGY_SECTION: string = 'dragula-methodology-section';

    /**
     * set up the form
     * linked to store via template directive
     */
    methodologyForm: FormGroup = new FormGroup({
        id: new FormControl(null),
        path: new FormControl(''),
        methodologyName: new FormControl(''),
        dateCreated: new FormControl(''),
        sections: this.fb.array([])
    });

    constructor(private readonly store: Store, private readonly ref: ChangeDetectorRef, private readonly fb: FormBuilder, private readonly dragulaService: DragulaService) {}

    ngOnInit(): void {
        /**
         * subscribe to the methodology state
         * patches methodology form when loaded from file
         */
        this.store
            .select(MethodologyState.methodology)
            .pipe(takeUntil(this.unsubscribed$))
            .subscribe((methodology: Methodology) => {
                if (!methodology) return;
                // reset the form
                this.methodologyForm.reset();
                this.clearAllForms();
                // patch methodology details and sections
                this.methodologyForm.patchValue(methodology);
                if (!!methodology.sections)
                    methodology.sections.forEach((methodologySection: MethodologySection) => {
                        this.addMethodologySection(methodologySection);
                    });
                // fire change detection
                this.ref.markForCheck();
            });

        /**
         * handle reorder events
         */
        this.dragulaService
            .dropModel(this.DRAGULA_METHODOLOGY_SECTION)
            .pipe(takeUntil(this.unsubscribed$))
            .subscribe((args: any) => {
                // remove sections from form
                this.clearAllForms();
                // reconstruct the sections forms in the updated order
                args.targetModel.forEach((sectionForm: FormGroup, index: number) => {
                    const methodologySection: MethodologySection = sectionForm.value;
                    methodologySection.sectionNumber = index + 1;
                    this.addMethodologySection(methodologySection);
                });
                // fire change detection
                this.ref.detectChanges();
            });
    }

    ngOnDestroy(): void {
        // unsubscribe on component teardown
        this.unsubscribed$.next(false);
        this.unsubscribed$.complete();
        // remove the dragula drake so we don't have duplicates
        this.dragulaService.destroy(this.DRAGULA_METHODOLOGY_SECTION);
    }

    isMethodologyLoaded = (): boolean => !!this.methodologyForm.controls.id.value;

    getNumSections = (): number => (this.methodologyForm.controls.sections as FormArray).controls.length;

    getNumTasks = (sectionForm: FormGroup): number => (sectionForm.controls.tasks as FormArray).controls.length;

    /**
     *  create a new methodology section
     */
    newMethodologySection(): void {
        this.addMethodologySection({ id: Guid.raw(), sectionNumber: this.getNumSections() + 1 });
    }

    /**
     *  add a methodology section to the form
     */
    addMethodologySection(methodologySection: MethodologySection): void {
        // create a form for the section
        const sectionForm: FormGroup = this.fb.group({
            id: [null],
            sectionName: [''],
            sectionNumber: [0],
            tasks: this.fb.array([])
        });
        // patch the form
        sectionForm.patchValue(methodologySection);
        // add tasks to the section
        if (!!methodologySection.tasks && methodologySection.tasks.length)
            methodologySection.tasks.forEach((methodologyTask: MethodologyTask) => {
                // create a form for the task
                const taskForm: FormGroup = this.fb.group({
                    id: [null],
                    taskName: [''],
                    taskNumber: [0]
                });
                // patch the form
                taskForm.patchValue(methodologyTask);
                // Add the new form to the FormArray
                (sectionForm.controls.tasks as FormArray).push(taskForm);
            });
        // Add the new form to the FormArray
        (this.methodologyForm.controls.sections as FormArray).push(sectionForm);
    }

    /**
     *  clear all methodology sections from forms
     */
    clearAllForms(): void {
        while ((this.methodologyForm.controls.sections as FormArray).length !== 0) {
            (this.methodologyForm.controls.sections as FormArray).removeAt(0);
        }
    }
}
