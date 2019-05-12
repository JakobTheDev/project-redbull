import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'redbull-methodology-details',
    templateUrl: './methodology-details.component.html',
    styleUrls: ['./methodology-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MethodologyDetailsComponent {
    constructor() {}
}
