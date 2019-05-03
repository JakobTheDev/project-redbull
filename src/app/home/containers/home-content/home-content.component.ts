import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'redbull-home-content',
    templateUrl: './home-content.component.html',
    styleUrls: ['./home-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeContentComponent {
    constructor() {}
}
