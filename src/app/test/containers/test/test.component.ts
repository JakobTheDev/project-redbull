import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'redbull-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent {
    /**
     * set up the form
     * linked to store via template directive
     */
    testForm: FormGroup = new FormGroup({
        id: new FormControl(null),
        path: new FormControl(''),
        name: new FormControl(''),
        sections: new FormArray([])
    });
}
