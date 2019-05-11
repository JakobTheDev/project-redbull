import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ProjectDetailsComponent } from 'app/project/containers/project-details/project-details.component';
import { ProjectComponent } from 'app/project/containers/project/project.component';
import { ProjectRoutingModule } from 'app/project/project-routing.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [ProjectComponent, ProjectDetailsComponent],
    imports: [SharedModule, ClarityModule, ProjectRoutingModule]
})
export class ProjectModule {}
