import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'redbull-methodology-task',
    templateUrl: './methodology-task.component.html',
    styleUrls: ['./methodology-task.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MethodologyTaskComponent {
    /**
     * the form representing this section of the methodology
     */
    @Input() sectionForm: FormGroup;

    /**
     * the form representing a task in the methodology
     */
    @Input() taskForm: FormGroup;

    constructor(private readonly fb: FormBuilder) {}

    /**
     * returns the number of tasks in the section
     */
    getNumTasks = (): number => (this.taskForm.controls.tasks as FormArray).controls.length;

    /**
     * handler - edit task notes button
     */
    onEditTaskNotes(): void {}
}
