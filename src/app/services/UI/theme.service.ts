import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    private readonly theme$ = new BehaviorSubject<Theme>('hanami');

    constructor() {}

    initTheme() {
        const theme = <Theme>window.localStorage.getItem('theme');
        if(!theme) {
            return;
        }

        this.changeTheme(theme);
    }

    getTheme() {
        return this.theme$.asObservable();
    }

    changeTheme(theme: Theme, { canSave }:{ canSave: boolean } = {canSave : true}) {
        if(canSave) {
            window.localStorage.setItem('theme', theme);
        }

        this.theme$.next(theme);
    }
}

export type Theme = 'hanami' | 'rainCloud' | 'twilight' | 'midNight';