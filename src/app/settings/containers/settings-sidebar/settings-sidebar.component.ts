import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'redbull-settings-sidebar',
    templateUrl: './settings-sidebar.component.html',
    styleUrls: ['./settings-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsSidebarComponent {
    constructor() {}
}
