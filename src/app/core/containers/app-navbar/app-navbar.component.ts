import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppRoutes } from 'app/shared/models/app-routes.model';

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
                // Set the active navigation icon after routing
                if (event instanceof NavigationEnd) this.currentRoute = event.urlAfterRedirects.split('/')[1];
                ref.detectChanges();
            }
        );
    }

    isCurrentRoute = (route: string): boolean => this.currentRoute === route;

    navbarIconClicked(appRoute: string): void {
        this.router.navigate([`/${appRoute}`]);
    }
}
