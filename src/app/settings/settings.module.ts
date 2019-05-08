import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SettingsComponent } from 'app/settings/containers/settings/settings.component';
import { SettingsRoutingModule } from 'app/settings/settings-routing.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [SettingsComponent],
    imports: [SharedModule, CommonModule, SettingsRoutingModule]
})
export class SettingsModule {}
