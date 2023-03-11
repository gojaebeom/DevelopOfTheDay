import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class DecorateBoxHandlerService {

    private isOpen$ = new BehaviorSubject<string>('close');

    constructor(
        @Inject(PLATFORM_ID) private readonly platformId: Object
    ) {}

    isOpened() {
        return this.isOpen$.asObservable();
    }

    open() {
        this.isOpen$.next('open');
    }

    close() {
        this.isOpen$.next('close');
    }
}