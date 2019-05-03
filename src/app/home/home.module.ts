import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { HomeContentComponent } from 'app/home/containers/home-content/home-content.component';
import { HomeSidebarComponent } from 'app/home/containers/home-sidebar/home-sidebar.component';
import { HomeComponent } from './containers/home/home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
    declarations: [HomeComponent, HomeContentComponent, HomeContentComponent, HomeSidebarComponent],
    imports: [CommonModule, HomeRoutingModule, ClarityModule]
})
export class HomeModule {}
