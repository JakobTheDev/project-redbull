import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ProjectDetailsComponent } from 'app/project/containers/project-details/project-details.component';
import { ProjectComponent } from 'app/project/containers/project/project.component';
import { ProjectRoutingModule } from 'app/project/project-routing.module';
import { ProjectState } from 'app/project/store/project.state';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [ProjectComponent, ProjectDetailsComponent],
    imports: [
        // load shared components, services etc.
        SharedModule,

        // set up project routes
        ProjectRoutingModule,

        // set up project state
        NgxsModule.forFeature([ProjectState])
    ]
})
export class ProjectModule {}
