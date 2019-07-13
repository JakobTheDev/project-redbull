import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { TranslateModule } from 'app/shared-modules/translate/translate.module';
import { AppContentComponent } from 'app/shared/components/app-content/app-content.component';
import { AppSidebarComponent } from 'app/shared/components/app-sidebar/app-sidebar.component';
import 'froala-editor/js/plugins.pkgd.min.js';
import { SidebarListItemComponent } from './components/sidebar-list-item/sidebar-list-item.component';
@NgModule({
    declarations: [AppContentComponent, AppSidebarComponent, SidebarListItemComponent],
    imports: [
        // Core modules required for app
        CommonModule,
        TranslateModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,

        // Clarity ui framework
        ClarityModule,

        // Froala text editor
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot()
    ],
    exports: [CommonModule, TranslateModule, ReactiveFormsModule, ClarityModule, FroalaEditorModule, FroalaViewModule, AppContentComponent, AppSidebarComponent, SidebarListItemComponent]
})
export class SharedModule {}
