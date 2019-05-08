import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProjectComponent } from 'app/project/containers/project/project.component';
import { ProjectRoutingModule } from 'app/project/project-routing.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [ProjectComponent],
    imports: [SharedModule, CommonModule, ProjectRoutingModule]
})
export class ProjectModule {}
