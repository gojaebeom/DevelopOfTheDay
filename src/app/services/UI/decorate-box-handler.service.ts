import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class DecorateBoxHandlerService {

    private isOpen$ = new BehaviorSubject<string>('close');

    constructor( ) {}

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