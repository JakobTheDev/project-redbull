import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { TranslateModule } from 'app/shared-modules/translate/translate.module';
import { AppContentComponent } from 'app/shared/components/app-content/app-content.component';
import { AppSidebarComponent } from 'app/shared/components/app-sidebar/app-sidebar.component';
import { SidebarListItemComponent } from './components/sidebar-list-item/sidebar-list-item.component';

@NgModule({
    declarations: [AppContentComponent, AppSidebarComponent, SidebarListItemComponent],
    imports: [CommonModule, TranslateModule, ReactiveFormsModule, ClarityModule],
    exports: [CommonModule, TranslateModule, ReactiveFormsModule, ClarityModule, AppContentComponent, AppSidebarComponent, SidebarListItemComponent]
})
export class SharedModule {}
