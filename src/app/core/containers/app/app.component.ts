import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ElectronService } from 'app/shared/services/electron.service';

@Component({
    selector: 'redbull-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    constructor(public electronService: ElectronService) {}

    onClickMin(): void {
        this.electronService.remote.getCurrentWindow().minimize();
    }

    onClickMax(): void {
        this.electronService.remote.getCurrentWindow().maximize();
    }

    onClickUnmaximise(): void {
        this.electronService.remote.getCurrentWindow().unmaximize();
    }

    onClickClose(): void {
        this.electronService.remote.getCurrentWindow().close();
    }

    isMaximized(): boolean {
        return this.electronService.remote.getCurrentWindow().isMaximized();
    }
}
