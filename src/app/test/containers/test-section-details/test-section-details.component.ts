import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngxs/store';
import { MethodologySection } from 'app/shared/models/methodology.model';
import { SelectSection } from 'app/test/store/test.action';
import { TestState } from 'app/test/store/test.state';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'redbull-test-section-details',
    templateUrl: './test-section-details.component.html',
    styleUrls: ['./test-section-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestSectionDetailsComponent implements OnDestroy {
    /**
     * unsubscrive brom component observables
     */
    unsubscribed$: Subject<boolean> = new Subject();

    /**
     * observable to the selected test
     */
    section$: Observable<MethodologySection>;

    constructor(private readonly route: ActivatedRoute, private readonly store: Store) {
        // load test into store based on route param
        this.route.params.pipe(takeUntil(this.unsubscribed$)).subscribe((params: Params) => {
            this.store.dispatch(new SelectSection({ id: params.id }));
        });
        // subscribe to test state
        this.section$ = this.store.select(TestState.section);
    }

    ngOnDestroy(): void {
        // unsubscribe on component teardown
        this.unsubscribed$.next(false);
        this.unsubscribed$.complete();
    }
}
