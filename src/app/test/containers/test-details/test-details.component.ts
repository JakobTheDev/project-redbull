import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'redbull-test-details',
    templateUrl: './test-details.component.html',
    styleUrls: ['./test-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestDetailsComponent {
    // Froala config
    options: Object = {
        attribution: false,
        toolbarInline: true
    };
}
