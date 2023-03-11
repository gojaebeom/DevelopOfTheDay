import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MusicService {

    private readonly musicList:IMusic[] = [
        {
            id: 1,
            title: 'Last Canival',
            thumbnail: 'https://firebasestorage.googleapis.com/v0/b/develop-of-the-day.appspot.com/o/music%2FlastCanival.png?alt=media&token=1ba19b50-aa09-499d-adf0-e47be57fab35',
            src: 'https://firebasestorage.googleapis.com/v0/b/develop-of-the-day.appspot.com/o/music%2FlastCarnival.mp3?alt=media&token=0e74d1d5-bdf5-4fb5-86f1-34114ea73c44'
        },
        {
            id: 2,
            title: 'Nanase - Dear',
            thumbnail: 'https://firebasestorage.googleapis.com/v0/b/develop-of-the-day.appspot.com/o/music%2Fdear.png?alt=media&token=a7529f88-54c7-491b-9747-360472cd16ab',
            src: 'https://firebasestorage.googleapis.com/v0/b/develop-of-the-day.appspot.com/o/music%2FlastCarnival.mp3?alt=media&token=0e74d1d5-bdf5-4fb5-86f1-34114ea73c44'
        },
        {
            id: 3,
            title: 'Glitter',
            thumbnail: 'https://firebasestorage.googleapis.com/v0/b/develop-of-the-day.appspot.com/o/music%2Fglitter.png?alt=media&token=d1d96db3-8828-4179-9cbb-ef5f63fc1283',
            src: 'https://firebasestorage.googleapis.com/v0/b/develop-of-the-day.appspot.com/o/music%2Fglitter.mp3?alt=media&token=9c1eb999-7f67-4e82-92e1-513aa27ae02c'
        },
    ];
    private readonly selectedMusic$ = new BehaviorSubject<IMusic>(this.musicList[0]);

    private readonly audio = new Audio();

    constructor() {
        // const audio = new Audio('https://firebasestorage.googleapis.com/v0/b/develop-of-the-day.appspot.com/o/music%2FlastCarnival.mp3?alt=media&token=0e74d1d5-bdf5-4fb5-86f1-34114ea73c44');
        
        this.audio.addEventListener('canplaythrough', () => {
            console.log('hello world');
            this.audio.play();
        });
    }

    getSelectMusic() {
        return this.selectedMusic$.asObservable();
    }

    play() {
        this.audio.src = this.selectedMusic$.value.src;
    }

    stop() {
        this.audio.pause();
    }

    selectNextMusic() {

    }

    selectPrevMusic() {

    }
}

export interface IMusic {
    id: number;
    title: string;
    src: string;
    thumbnail: string;
}