import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from 'app/project/containers/project/project.component';
import { AppRoutes } from 'app/shared/models/app-routes.model';

const routes: Routes = [
    {
        path: AppRoutes.PROJECT,
        component: ProjectComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectRoutingModule {}
