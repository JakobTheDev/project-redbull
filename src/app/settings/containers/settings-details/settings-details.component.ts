import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'redbull-settings-details',
    templateUrl: './settings-details.component.html',
    styleUrls: ['./settings-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsDetailsComponent {
    constructor() {}
}
