import { NgModule } from '@angular/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from 'app/shared/shared.module';
import { TestDetailsComponent } from 'app/test/containers/test-details/test-details.component';
import { TestSectionDetailsComponent } from 'app/test/containers/test-section-details/test-section-details.component';
import { TestSidebarComponent } from 'app/test/containers/test-sidebar/test-sidebar.component';
import { TestTaskDetailsComponent } from 'app/test/containers/test-task-details/test-task-details.component';
import { TestComponent } from 'app/test/containers/test/test.component';
import { TestState } from 'app/test/store/test.state';
import { TestRoutingModule } from 'app/test/test-routing.module';

@NgModule({
    declarations: [TestComponent, TestDetailsComponent, TestSectionDetailsComponent, TestTaskDetailsComponent, TestSidebarComponent],
    imports: [
        // load shared components, services etc.
        SharedModule,

        // set up methodology routes
        TestRoutingModule,

        // set up project state
        NgxsModule.forFeature([TestState]),
        NgxsFormPluginModule
    ]
})
export class TestModule {}
