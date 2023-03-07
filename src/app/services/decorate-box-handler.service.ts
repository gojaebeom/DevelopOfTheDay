import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { BehaviorSubject, fromEvent, tap } from 'rxjs';


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

    toggleObserver() {
        if(!isPlatformBrowser(this.platformId)) {
            return;
        }

        document.addEventListener('click', (event:any) => {
            let target = event.target;

            const decorateBox = document.querySelector('#decorateBox');
            if(!decorateBox){
                return;
            }

            while(true) {
                if(target !== decorateBox) {
                    target = target.parentNode;
                } 

                if(!target) {
                    this.isOpen$.next('close');
                    return;
                }

                if(target === document.body) {
                    this.isOpen$.next('close');
                    return;
                }

                if(target === decorateBox) {
                    this.isOpen$.next('open');
                    return;
                }
            }

        });
    }
}