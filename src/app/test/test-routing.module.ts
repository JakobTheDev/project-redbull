import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from 'app/shared/models/app-routes.model';
import { TestComponent } from 'app/test/containers/test/test.component';

const routes: Routes = [
    {
        path: AppRoutes.TEST,
        component: TestComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TestRoutingModule {}
