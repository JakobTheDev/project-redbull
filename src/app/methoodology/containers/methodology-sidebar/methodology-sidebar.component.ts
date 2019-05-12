import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'redbull-methodology-sidebar',
    templateUrl: './methodology-sidebar.component.html',
    styleUrls: ['./methodology-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MethodologySidebarComponent {
    constructor() {}

    newMethodology(): void {}
}
