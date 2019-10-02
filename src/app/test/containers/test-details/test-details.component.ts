import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngxs/store';
import { Test } from 'app/shared/models/test.model';
import { SelectTest } from 'app/test/store/test.action';
import { TestState } from 'app/test/store/test.state';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'redbull-test-details',
    templateUrl: './test-details.component.html',
    styleUrls: ['./test-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestDetailsComponent implements OnDestroy {
    /**
     * unsubscrive brom component observables
     */
    unsubscribed$: Subject<boolean> = new Subject();

    /**
     * observable to the selected test
     */
    test$: Observable<Test>;

    constructor(private readonly cdRef: ChangeDetectorRef, private readonly route: ActivatedRoute, private readonly store: Store) {
        // load test into store based on route param
        this.route.params.pipe(takeUntil(this.unsubscribed$)).subscribe((params: Params) => {
            this.store.dispatch(new SelectTest({ id: params.id }));
        });
        // subscribe to test state
        this.test$ = this.store.select(TestState.test);
    }

    ngOnDestroy(): void {
        // unsubscribe on component teardown
        this.unsubscribed$.next(false);
        this.unsubscribed$.complete();
    }
}
