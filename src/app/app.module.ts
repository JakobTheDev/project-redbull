import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppNavbarComponent } from 'app/core/containers/app-navbar/app-navbar.component';
import { AppComponent } from 'app/core/containers/app/app.component';
import { CoreModule } from 'app/core/core.module';
import { WebviewDirective } from 'app/shared/directives/webview.directive';
import { ElectronService } from 'app/shared/services/electron.service';
import { AppRoutingModule } from './app-routing.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [AppComponent, AppNavbarComponent, WebviewDirective],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ClarityModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        CoreModule
    ],
    providers: [ElectronService],
    bootstrap: [AppComponent]
})
export class AppModule {}
