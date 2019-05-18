import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'redbull-sidebar-list-item',
    templateUrl: './sidebar-list-item.component.html',
    styleUrls: ['./sidebar-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarListItemComponent {
    @Input() title: string;
    @Input() subtitle: string;
    @Input() selected: boolean;

    constructor() {}
}
