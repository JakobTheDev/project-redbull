import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from 'app/shared-modules/translate/translate.module';
import { AppContentComponent } from 'app/shared/components/app-content/app-content.component';
import { AppSidebarComponent } from 'app/shared/components/app-sidebar/app-sidebar.component';

@NgModule({
    declarations: [AppContentComponent, AppSidebarComponent],
    imports: [CommonModule, TranslateModule, ReactiveFormsModule],
    exports: [CommonModule, TranslateModule, ReactiveFormsModule, AppContentComponent, AppSidebarComponent]
})
export class SharedModule {}
