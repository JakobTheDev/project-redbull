import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'redbull-home-sidebar',
    templateUrl: './home-sidebar.component.html',
    styleUrls: ['./home-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeSidebarComponent {
    constructor() {}
}
