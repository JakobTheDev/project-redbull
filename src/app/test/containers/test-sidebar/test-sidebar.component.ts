import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'redbull-test-sidebar',
    templateUrl: './test-sidebar.component.html',
    styleUrls: ['./test-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestSidebarComponent {
    /**
     * create a new test
     */
    newTest(): void {}
}
