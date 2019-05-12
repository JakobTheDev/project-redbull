import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from 'app/core/models/app-routes.model';
import { MethodologyComponent } from 'app/methoodology/containers/methodology/methodology.component';

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
export class MethoodologyRoutingModule {}
