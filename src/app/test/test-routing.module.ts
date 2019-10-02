import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppParams, AppRoutes, TestRoutes } from 'app/shared/models/app-routes.model';
import { TestDetailsComponent } from 'app/test/containers/test-details/test-details.component';
import { TestSectionDetailsComponent } from 'app/test/containers/test-section-details/test-section-details.component';
import { TestTaskDetailsComponent } from 'app/test/containers/test-task-details/test-task-details.component';
import { TestComponent } from 'app/test/containers/test/test.component';

const routes: Routes = [
    {
        path: AppRoutes.TEST,
        component: TestComponent,
        children: [
            {
                path: `${TestRoutes.OVERIEW}/${AppParams.ID}`,
                component: TestDetailsComponent
            },
            {
                path: `${TestRoutes.SECTION}/${AppParams.ID}`,
                component: TestSectionDetailsComponent
            },
            {
                path: `${TestRoutes.TASK}/${AppParams.ID}`,
                component: TestTaskDetailsComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TestRoutingModule {}
