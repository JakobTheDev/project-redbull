import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoadProject, NewProject } from 'app/project/store/project.action';
import { ProjectState } from 'app/project/store/project.state';
import { fileFilters } from 'app/shared/models/file-filters.model';
import { Project, ProjectProperties } from 'app/shared/models/project.model';
import { ElectronService } from 'app/shared/services/electron.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'redbull-project-sidebar',
    templateUrl: './project-sidebar.component.html',
    styleUrls: ['./project-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectSidebarComponent {
    // store observables
    project$: Observable<Project>;
    projectList$: Observable<Array<ProjectProperties>>;

    constructor(private readonly electronService: ElectronService, private readonly store: Store) {
        this.project$ = this.store.select(ProjectState.project);
        this.projectList$ = this.store.select(ProjectState.projectList);
    }

    newProject(): void {
        this.electronService.remote.dialog.showSaveDialog({ filters: fileFilters }, (fileName: any) => {
            // user cancelled or something failed, abort
            if (fileName === undefined) {
                return;
            }
            // create the new project file
            this.electronService.fs.writeFile(fileName, '', (err: any) => {
                // user cancelled or something failed, abort
                if (err) alert(err.message);
                // save new project to the store
                this.store.dispatch(new NewProject({ path: fileName }));
            });
        });
    }

    // construct the title line
    getTitleLine(project: ProjectProperties): string {
        // construct title (yuck)
        let title: string = project.projectNumber ? `[${project.projectNumber}]` : ''; // project number
        title = project.projectNumber && project.clientName ? `${title} ` : `${title}`; // space separator
        title = project.clientName ? `${title}${project.clientName}` : `${title}`; // client name
        title = project.clientName && project.projectName ? `${title} - ` : `${title}`; // separator
        title = project.projectName ? `${title}${project.projectName}` : `${title}`; // project name
        return title;
    }

    // load project on select
    onProjectSelected(projectProperties: ProjectProperties): void {
        this.store.dispatch(new LoadProject({ projectProperties }));
    }

    // trackBy functions
    trackByProject = (index: number, projectProperties: ProjectProperties) => projectProperties.path;
}
