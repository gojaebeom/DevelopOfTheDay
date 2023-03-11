import { Injectable } from "@angular/core";

import { BehaviorSubject, debounceTime, Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    private loading$ = new BehaviorSubject<boolean>(false);
    private addInterval$ = new BehaviorSubject<number>(0);

    constructor() {
        this.addInterval$
            .pipe(
                debounceTime(500),
                tap(() => this.loading$.next(false))
            )
            .subscribe();
    }

    isLoading() {
        return this.loading$.asObservable();
    }

    showLoaderUntilCompletedBy(obs$: Observable<any>) {
        this.loading$.next(true);
        this.addInterval$.next(this.addInterval$.value + 100);

        return obs$;
    }

}