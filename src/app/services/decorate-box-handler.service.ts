import { Injectable } from '@angular/core';

import { BehaviorSubject, fromEvent, tap } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class DecorateBoxHandlerService {

    private isOpen$ = new BehaviorSubject<string>('close');

    isOpened() {
        return this.isOpen$.asObservable();
    }

    toggleObserver() {
        fromEvent(document, 'click')
            .pipe(
                tap((event:any) => {
                    let target = event.target;

                    const decorateBox = document.querySelector('#decorateBox');
                    if(!decorateBox){
                        return;
                    }

                    while(true) {
                        if(target !== decorateBox) {
                            target = target.parentNode;
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
                })
            )
            .subscribe();
    }
}