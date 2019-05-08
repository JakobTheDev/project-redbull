import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'redbull-app-sidebar',
    templateUrl: './app-sidebar.component.html',
    styleUrls: ['./app-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSidebarComponent {
    constructor() {}
}
