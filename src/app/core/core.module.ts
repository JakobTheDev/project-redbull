import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [],
    imports: [SharedModule, CommonModule, ClarityModule]
})
export class CoreModule {}
