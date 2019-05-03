import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { ElectronService } from './providers/electron.service';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            providers: [ElectronService],
            imports: [RouterTestingModule, TranslateModule.forRoot()]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
        const app: AppComponent = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});

class TranslateServiceStub {
    setDefaultLang(lang: string): void {}
}
