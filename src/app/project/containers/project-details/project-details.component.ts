import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { UpdateProject } from 'app/project/store/project.action';
import { ProjectState } from 'app/project/store/project.state';
import { Project } from 'app/shared/models/project.model';
import { debounceTime } from 'rxjs/operators';

const STORE_UPDATE_DEBOUNCE: number = 2002;

@Component({
    selector: 'redbull-project-details',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailsComponent {
    projectDetailsForm: FormGroup = new FormGroup({
        path: new FormControl(''),
        clientName: new FormControl(''),
        projectNumber: new FormControl(''),
        projectName: new FormControl(''),
        workPackage: new FormControl(''),
        businessDevelopmentName: new FormControl(''),
        qualityAssuranceName: new FormControl(''),
        projectLeadName: new FormControl(''),
        clientSponsor: new FormControl(''),
        isVAAReturned: new FormControl(false)
    });

    constructor(private readonly store: Store, private readonly ref: ChangeDetectorRef) {
        // update the store
        this.projectDetailsForm.valueChanges.pipe(debounceTime(STORE_UPDATE_DEBOUNCE)).subscribe((project: Project) => this.store.dispatch(new UpdateProject({ project })));

        this.store.select(ProjectState.project).subscribe((project: Project) => {
            // path changes when project changes
            if (project && project.path !== this.projectDetailsForm.get('path').value) {
                this.projectDetailsForm.reset();
                this.projectDetailsForm.patchValue(project);
                this.ref.markForCheck();
            }
        });
    }
}
