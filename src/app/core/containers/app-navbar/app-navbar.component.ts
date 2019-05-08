import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { AppRoutes } from 'app/core/models/app-routes.model';

@Component({
    selector: 'redbull-app-navbar',
    templateUrl: './app-navbar.component.html',
    styleUrls: ['./app-navbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNavbarComponent {
    // constants
    AppRoutes: any = AppRoutes;

    currentRoute: string;

    constructor(private readonly router: Router, private readonly ref: ChangeDetectorRef, private readonly route: ActivatedRoute) {
        router.events.subscribe(
            (event: any): void => {
                if (event instanceof NavigationStart) this.currentRoute = event.url.split('/')[1];
                ref.detectChanges();
            }
        );
    }

    // final part of ternary sets default to project
    // TODO: fix this logic
    isCurrentRoute = (route: string): boolean => (this.currentRoute ? this.currentRoute === route : route === AppRoutes.PROJECT);

    navbarIconClicked(appRoute: string): void {
        this.router.navigate([`/${appRoute}`]);
    }
}
