import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'redbull-sidebar-list-item',
    templateUrl: './sidebar-list-item.component.html',
    styleUrls: ['./sidebar-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarListItemComponent {
    /**
     * title of the list item
     */
    @Input() title: string;

    /**
     * subtitle of the list item
     */
    @Input() subtitle: string;

    /**
     * whether the list item is currently selected
     */
    @Input() selected: boolean;
}
