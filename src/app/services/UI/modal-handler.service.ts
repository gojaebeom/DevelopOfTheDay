import { Injectable } from "@angular/core";

import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ModalHandlerService {

    private state$ = new BehaviorSubject<IModalState>({
        component: null,
    });

    getState() {
        return this.state$.asObservable();
    }

    open(state: IModalState) {
        this.state$.next(state);
    }

    close() {
        this.state$.next({
            ...this.state$.value,
            component: null
        })
    }
}

export interface IModalState {
    component: any
}