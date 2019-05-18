import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from 'app/settings/containers/settings/settings.component';
import { AppRoutes } from 'app/shared/models/app-routes.model';

const routes: Routes = [
    {
        path: AppRoutes.SETTINGS,
        component: SettingsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule {}
