import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoadMethodologyList } from 'app/methoodology/store/methodology.action';
import { LoadProjectList } from 'app/project/store/project.action';
import { ProjectState } from 'app/project/store/project.state';
import { Project } from 'app/shared/models/project.model';
import { ElectronService } from 'app/shared/services/electron.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'redbull-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    // store observables
    project$: Observable<Project>;

    constructor(public electronService: ElectronService, private readonly store: Store) {
        // set up store observables
        this.project$ = this.store.select(ProjectState.project);

        // load project list
        store.dispatch(new LoadProjectList());

        // load methodology list
        store.dispatch(new LoadMethodologyList());
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

    // construct the title line
    getTitleLine(project: Project): string {
        if (!project) return '';
        // construct title (yuck)
        let title: string = project.projectNumber ? `[${project.projectNumber}]` : ''; // project number
        title = project.projectNumber && project.clientName ? `${title} ` : `${title}`; // space separator
        title = project.clientName ? `${title}${project.clientName}` : `${title}`; // client name
        title = project.clientName && project.projectName ? `${title} - ` : `${title}`; // separator
        title = project.projectName ? `${title}${project.projectName}` : `${title}`; // project name
        return title;
    }
}
