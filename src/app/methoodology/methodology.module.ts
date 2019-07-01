import { NgModule } from '@angular/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { MethodologyComponent } from 'app/methoodology/containers/methodology/methodology.component';
import { SharedModule } from 'app/shared/shared.module';
import { DragulaModule } from 'ng2-dragula';
import { MethodologySectionComponent } from './components/methodology-section/methodology-section.component';
import { MethodologyTaskComponent } from './components/methodology-task/methodology-task.component';
import { MethodologyDetailsComponent } from './containers/methodology-details/methodology-details.component';
import { MethodologySidebarComponent } from './containers/methodology-sidebar/methodology-sidebar.component';
import { MethoodologyRoutingModule } from './methodology-routing.module';
import { MethodologyState } from './store/methodology.state';

@NgModule({
    declarations: [MethodologyComponent, MethodologySidebarComponent, MethodologyDetailsComponent, MethodologySectionComponent, MethodologyTaskComponent],
    imports: [
        // load shared components, services etc.
        SharedModule,

        // set up dragula services
        DragulaModule.forRoot(),

        // set up methodology routes
        MethoodologyRoutingModule,

        // set up project state
        NgxsModule.forFeature([MethodologyState]),
        NgxsFormPluginModule
    ]
})
export class MethodologyModule {}
