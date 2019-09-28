import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngxs/store';
import { MethodologyTask } from 'app/shared/models/methodology.model';
import { SelectTask, UpdateTaskNotes } from 'app/test/store/test.action';
import { TestState } from 'app/test/store/test.state';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'redbull-test-task-details.component',
    templateUrl: './test-task-details.component.html',
    styleUrls: ['./test-task-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestTaskDetailsComponent implements OnDestroy, OnInit {
    // Froala config
    options: Object = {
        attribution: false,
        toolbarInline: true
    };

    /**
     * unsubscrive brom component observables
     */
    unsubscribed$: Subject<boolean> = new Subject();

    /**
     * set up the form
     */
    taskForm: FormGroup = new FormGroup({
        testNotes: new FormControl(null)
    });

    /**
     * currently selected task
     */
    task: MethodologyTask;

    constructor(private readonly cdRef: ChangeDetectorRef, private readonly route: ActivatedRoute, private readonly store: Store) {
        // load test into store based on route param
        this.route.params.pipe(takeUntil(this.unsubscribed$)).subscribe((params: Params) => {
            this.store.dispatch(new SelectTask({ id: params.id }));
        });
    }

    ngOnInit(): void {
        this.store
            .select(TestState.task)
            .pipe(
                takeUntil(this.unsubscribed$),
                // filter out undefined task in store
                filter((task: MethodologyTask) => !!task),
                // filter out events where task id hasn't changed
                filter((task: MethodologyTask) => !this.task || task.id !== this.task.id)
            )
            .subscribe((task: MethodologyTask) => {
                // store the task locally
                this.task = task;
                // patch the form
                if (!!task) this.taskForm.patchValue(task);
                // force change detection
                this.cdRef.detectChanges();
            });

        this.taskForm.valueChanges.subscribe((testNotes: string) => {
            if (!!this.task) this.store.dispatch(new UpdateTaskNotes({ id: this.task.id, testNotes }));
        });
    }

    ngOnDestroy(): void {
        // unsubscribe on component teardown
        this.unsubscribed$.next(false);
        this.unsubscribed$.complete();
    }
}
