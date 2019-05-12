import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from 'app/core/models/app-routes.model';

const routes: Routes = [
    {
        path: '',
        redirectTo: AppRoutes.PROJECT,
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: AppRoutes.PROJECT
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
