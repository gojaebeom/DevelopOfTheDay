import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    private selectedTheme$ = new BehaviorSubject<Theme>('MID_NIGHT');

    private themeSystem$ = new BehaviorSubject<IThemeSystem>({
        bgPrimary: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900',
        bgSecondary: 'bg-[#1e1a3d]',
        bgThird: 'bg-[#161234]',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-200',
        textThird: 'text-gray-200',
    });

    getThemeSystem() {
        return this.themeSystem$.asObservable();
    }

    changeTheme(theme: Theme) {
        switch(theme) {
            case 'HANAMI' : 
                this.themeSystem$.next({
                    bgPrimary: 'bg-gradient-to-tr from-[#f7e3cf]  to-[#edf8ec]',
                    bgSecondary: 'bg-white',
                    bgThird: 'bg-gray-100',
                    textPrimary: 'text-neutral-700',
                    textSecondary: 'text-neutral-700',
                    textThird: 'text-neutral-700',
                });
                return; 
            case 'RAIN_CLOUD' : 
                this.themeSystem$.next({
                    bgPrimary: 'bg-gradient-to-br from-[#bfbedc]  to-[#d8e5ec]',
                    bgSecondary: 'bg-white',
                    bgThird: 'bg-gray-100',
                    textPrimary: 'text-neutral-700',
                    textSecondary: 'text-neutral-700',
                    textThird: 'text-neutral-700',
                });
                return; 
            case 'TWILIGHT' : 
                this.themeSystem$.next({
                    bgPrimary: 'bg-gradient-to-br from-[#f9d99a]  to-[#f6c2ab]',
                    bgSecondary: 'bg-white',
                    bgThird: 'bg-gray-100',
                    textPrimary: 'text-neutral-700',
                    textSecondary: 'text-neutral-700',
                    textThird: 'text-neutral-700',
                });
                return; 
            case 'MID_NIGHT' : 
                this.themeSystem$.next({
                    bgPrimary: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900',
                    bgSecondary: 'bg-[#1e1a3d]',
                    bgThird: 'bg-[#161234]',
                    textPrimary: 'text-white',
                    textSecondary: 'text-gray-200',
                    textThird: 'text-gray-200',
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
    bgThird: string;
    textPrimary: string;
    textSecondary: string;
    textThird: string;
}