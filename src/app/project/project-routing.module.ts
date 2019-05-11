import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from 'app/core/models/app-routes.model';
import { ProjectComponent } from 'app/project/containers/project/project.component';

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
