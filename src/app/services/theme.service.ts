import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    private showThemePriview$ = new BehaviorSubject<boolean>(false);

    private themeSystem$ = new BehaviorSubject<IThemeSystem>({
        bgPrimary: 'bg-gradient-to-tr from-[#f7e3cf] to-[#edf8ec]',
        bgSecondary: 'bg-white',
        bgTertiary: 'bg-gray-100',
        textPrimary: 'text-neutral-700',
        textSecondary: 'text-neutral-700',
        textTertiary: 'text-neutral-700',
        border: 'border-gray-100',
    });

    constructor(
        @Inject(PLATFORM_ID) private readonly platformId: Object
    ) {
        if(!isPlatformBrowser(this.platformId)) {
            return;
        }

        const theme = <Theme>window.localStorage.getItem('theme');
        if(!theme) {
            this.showThemePriview$.next(true);
            return;
        }
        this.changeTheme(theme);
        this.showThemePriview$.next(false);
    }

    getThemeSystem() {
        return this.themeSystem$.asObservable();
    }

    showThemePreview() {
        return this.showThemePriview$.asObservable();
    }

    changeTheme(theme: Theme, { canSave }:{ canSave: boolean } = {canSave : true}) {
        if(canSave) {
            window.localStorage.setItem('theme', theme);
            this.showThemePriview$.next(false);
        }

        switch(theme) {
            case 'HANAMI' : 
                this.themeSystem$.next({
                    bgPrimary: 'bg-gradient-to-tr from-[#f7e3cf] to-[#edf8ec]',
                    bgSecondary: 'bg-white',
                    bgTertiary: 'bg-gray-100',
                    textPrimary: 'text-neutral-700',
                    textSecondary: 'text-neutral-700',
                    textTertiary: 'text-neutral-700',
                    border: 'border-gray-100',
                });
                return; 
            case 'RAIN_CLOUD' : 
                this.themeSystem$.next({
                    bgPrimary: 'bg-gradient-to-br from-[#bfbedc] to-[#d8e5ec]',
                    bgSecondary: 'bg-white',
                    bgTertiary: 'bg-gray-200',
                    textPrimary: 'text-neutral-700',
                    textSecondary: 'text-neutral-700',
                    textTertiary: 'text-neutral-700',
                    border: 'border-gray-200'
                });
                return; 
            case 'TWILIGHT' : 
                this.themeSystem$.next({
                    bgPrimary: 'bg-gradient-to-br from-[#f9d99a] to-[#f6c2ab]',
                    bgSecondary: 'bg-white',
                    bgTertiary: 'bg-gray-200',
                    textPrimary: 'text-neutral-700',
                    textSecondary: 'text-neutral-700',
                    textTertiary: 'text-neutral-700',
                    border: 'border-gray-200',
                });
                return; 
            case 'MID_NIGHT' : 
                this.themeSystem$.next({
                    bgPrimary: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900',
                    bgSecondary: 'bg-[#252048]',
                    bgTertiary: 'bg-[#161234]',
                    textPrimary: 'text-white',
                    textSecondary: 'text-gray-200',
                    textTertiary: 'text-gray-200',
                    border: 'border-[#161234]'
                });
                return; 
            default: 
                return;
        }
    }
}

export type Theme = 'HANAMI' | 'RAIN_CLOUD' | 'TWILIGHT' | 'MID_NIGHT';

export interface IThemeSystem {
    bgPrimary: string;
    bgSecondary: string;
    bgTertiary: string;
    textPrimary: string;
    textSecondary: string;
    textTertiary?: string;
    border: string;
}