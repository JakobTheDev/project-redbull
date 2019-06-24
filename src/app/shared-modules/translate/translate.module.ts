import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule as NgxTranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'app/shared-modules/translate/utils/translate-http-loader.util';

/**
 * the forRoot module (this needs to be seperate due to the translate module forroot instantiation)
 */
@NgModule({
    imports: [
        NgxTranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    exports: [NgxTranslateModule],
    providers: []
})
export class RootTranslateModule {
    constructor(private readonly translate: TranslateService) {
        translate.setDefaultLang('en');
    }
}

@NgModule({
    imports: [NgxTranslateModule],
    exports: [NgxTranslateModule],
    providers: []
})
export class TranslateModule {
    /**
     * instantiate the ngx translate service
     * (ensure we only create a single instance of translate service)
     */
    static forRoot(): ModuleWithProviders {
        return { ngModule: RootTranslateModule };
    }
}
