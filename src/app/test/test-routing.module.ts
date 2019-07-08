import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppParams, AppRoutes, TestRoutes } from 'app/shared/models/app-routes.model';
import { TestComponent } from 'app/test/containers/test/test.component';

const routes: Routes = [
    {
        path: AppRoutes.TEST,
        component: TestComponent
    },
    {
        path: `${AppRoutes.TEST}/${TestRoutes.OVERIEW}/${AppParams.ID}`,
        component: TestComponent
    },
    {
        path: `${AppRoutes.TEST}/${TestRoutes.SECTION}/${AppParams.ID}`,
        component: TestComponent
    },
    {
        path: `${AppRoutes.TEST}/${TestRoutes.TASK}/${AppParams.ID}`,
        component: TestComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TestRoutingModule {}
