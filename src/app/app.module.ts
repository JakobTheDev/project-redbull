import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppNavbarComponent } from 'app/core/containers/app-navbar/app-navbar.component';
import { AppComponent } from 'app/core/containers/app/app.component';
import { CoreModule } from 'app/core/core.module';
import { MethodologyModule } from 'app/methodology/methodology.module';
import { ProjectModule } from 'app/project/project.module';
import { SettingsModule } from 'app/settings/settings.module';
import { TranslateModule } from 'app/shared-modules/translate/translate.module';
import { WebviewDirective } from 'app/shared/directives/webview.directive';
import { ElectronService } from 'app/shared/services/electron.service';
import { environment } from 'environments/environment';
import { DragulaModule } from 'ng2-dragula';
import { AppRoutingModule } from './app-routing.module';
import { TestModule } from './test/test.module';

@NgModule({
    declarations: [AppComponent, AppNavbarComponent, WebviewDirective],
    imports: [
        // Core modules required for app
        BrowserModule,
        HttpClientModule,
        // Translate internationalisation strings
        TranslateModule.forRoot(),

        // clarity ui framework
        ClarityModule,

        // dragula
        DragulaModule.forRoot(),

        // ngxs state management
        NgxsModule.forRoot(),
        NgxsFormPluginModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot({
            disabled: environment.production
        }),

        // routes for initial redirect
        AppRoutingModule,

        // Import applications modules
        // No lazy-loading due to electron app
        CoreModule,
        ProjectModule,
        MethodologyModule,
        SettingsModule,
        TestModule
    ],
    providers: [ElectronService],
    bootstrap: [AppComponent]
})
export class AppModule {}
