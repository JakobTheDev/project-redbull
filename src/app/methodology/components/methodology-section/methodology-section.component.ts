import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MethodologyTask } from 'app/shared/models/methodology.model';
import { Guid } from 'guid-typescript';

@Component({
    selector: 'redbull-methodology-section',
    templateUrl: './methodology-section.component.html',
    styleUrls: ['./methodology-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MethodologySectionComponent {
    /**
     * the form representing this section of the methodology
     */
    @Input() sectionForm: FormGroup;

    constructor(private readonly fb: FormBuilder) {}

    /**
     * returns the number of tasks in the section
     */
    getNumTasks = (): number => (this.sectionForm.controls.tasks as FormArray).controls.length;

    /**
     *  create a new methodology task
     */
    newMethodologyTask(): void {
        this.addMethodologyTask({ id: Guid.raw(), number: this.getNumTasks() + 1 });
    }

    /**
     *  add a methodology task to the form
     */
    addMethodologyTask(methodologyTask: MethodologyTask): void {
        // create a form for the task
        const taskForm: FormGroup = this.fb.group({
            id: [null],
            name: [''],
            number: [0]
        });
        // patch the form
        taskForm.patchValue(methodologyTask);
        // Add the new form to the FormArray
        (this.sectionForm.controls.tasks as FormArray).push(taskForm);
    }
}
