import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { RemoveProject } from 'app/project/store/project.action';
import { ProjectState } from 'app/project/store/project.state';
import { Project } from 'app/shared/models/project.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'redbull-project-details',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailsComponent implements OnDestroy, OnInit {
    /**
     * unsubscrive brom component observables
     */
    unsubscribed$: Subject<boolean> = new Subject();

    /**
     * set up the form
     * linked to store via template directive
     */
    projectForm: FormGroup = new FormGroup({
        id: new FormControl(null),
        path: new FormControl(''),
        clientName: new FormControl(''),
        projectNumber: new FormControl(''),
        projectName: new FormControl(''),
        projectTitle: new FormControl(''),
        workPackage: new FormControl(''),
        businessDevelopmentName: new FormControl(''),
        qualityAssuranceName: new FormControl(''),
        projectLeadName: new FormControl(''),
        clientSponsor: new FormControl(''),
        isVAAReturned: new FormControl(false)
    });

    constructor(private readonly store: Store, private readonly ref: ChangeDetectorRef) {}

    ngOnInit(): void {
        /**
         * subscribe to the project state
         * patches project form when loaded from file
         */
        this.store
            .select(ProjectState.project)
            .pipe(takeUntil(this.unsubscribed$))
            .subscribe((project: Project) => {
                // reset the form
                this.projectForm.reset();
                // patch project details
                if (!!project) this.projectForm.patchValue(project);
                // kick off change detection
                this.projectForm.updateValueAndValidity();
                this.ref.detectChanges();
            });
    }

    ngOnDestroy(): void {
        // unsubscribe on component teardown
        this.unsubscribed$.next(false);
        this.unsubscribed$.complete();
    }

    /**
     * returns whether a project is currently loaded
     */
    isProjectLoaded = (): boolean => !!this.projectForm.controls.id.value;

    /**
     * remove the current project
     */
    removeProject(): void {
        this.store.dispatch(new RemoveProject());
    }
}
