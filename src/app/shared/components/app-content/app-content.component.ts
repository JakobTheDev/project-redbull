import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'redbull-app-content',
    templateUrl: './app-content.component.html',
    styleUrls: ['./app-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppContentComponent {
    constructor() {}
}
