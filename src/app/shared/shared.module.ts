import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppContentComponent } from 'app/shared/components/app-content/app-content.component';
import { AppSidebarComponent } from 'app/shared/components/app-sidebar/app-sidebar.component';

@NgModule({
    declarations: [AppContentComponent, AppSidebarComponent],
    imports: [CommonModule],
    exports: [AppContentComponent, AppSidebarComponent]
})
export class SharedModule {}
