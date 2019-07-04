import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MethodologyComponent } from 'app/methodology/containers/methodology/methodology.component';
import { AppRoutes } from 'app/shared/models/app-routes.model';

const routes: Routes = [
    {
        path: AppRoutes.METHODOLOGY,
        component: MethodologyComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MethodologyRoutingModule {}
