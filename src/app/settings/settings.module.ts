import { NgModule } from '@angular/core';
import { SettingsComponent } from 'app/settings/containers/settings/settings.component';
import { SettingsRoutingModule } from 'app/settings/settings-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { SettingsDetailsComponent } from './containers/settings-details/settings-details.component';
import { SettingsSidebarComponent } from './containers/settings-sidebar/settings-sidebar.component';

@NgModule({
    declarations: [SettingsComponent, SettingsSidebarComponent, SettingsDetailsComponent],
    imports: [SharedModule, SettingsRoutingModule]
})
export class SettingsModule {}
