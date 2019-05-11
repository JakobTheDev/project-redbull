import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { AppNavbarComponent } from 'app/core/containers/app-navbar/app-navbar.component';
import { AppComponent } from 'app/core/containers/app/app.component';
import { CoreModule } from 'app/core/core.module';
import { TranslateModule } from 'app/shared-modules/translate/translate.module';
import { WebviewDirective } from 'app/shared/directives/webview.directive';
import { ElectronService } from 'app/shared/services/electron.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [AppComponent, AppNavbarComponent, WebviewDirective],
    imports: [BrowserModule, HttpClientModule, ClarityModule, TranslateModule.forRoot(), ReactiveFormsModule, AppRoutingModule, CoreModule],
    providers: [ElectronService],
    bootstrap: [AppComponent]
})
export class AppModule {}
