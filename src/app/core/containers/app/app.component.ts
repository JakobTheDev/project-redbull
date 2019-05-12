import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoadProjectList } from 'app/project/store/project.action';
import { ElectronService } from 'app/shared/services/electron.service';

@Component({
    selector: 'redbull-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    constructor(public electronService: ElectronService, private readonly store: Store) {
        // load project list
        store.dispatch(new LoadProjectList());
    }

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
