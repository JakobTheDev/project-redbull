import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'redbull-project-details',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailsComponent {
    projectDetailsForm: FormGroup = new FormGroup({
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
}
