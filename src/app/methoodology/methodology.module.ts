import { NgModule } from '@angular/core';
import { MethodologyComponent } from 'app/methoodology/containers/methodology/methodology.component';
import { SharedModule } from 'app/shared/shared.module';
import { MethodologyDetailsComponent } from './containers/methodology-details/methodology-details.component';
import { MethodologySidebarComponent } from './containers/methodology-sidebar/methodology-sidebar.component';
import { MethoodologyRoutingModule } from './methodology-routing.module';

@NgModule({
    declarations: [MethodologyComponent, MethodologySidebarComponent, MethodologyDetailsComponent],
    imports: [
        // load shared components, services etc.
        SharedModule,

        // set up methodology routes
        MethoodologyRoutingModule
    ]
})
export class MethodologyModule {}
