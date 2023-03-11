import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';

import { finalize, fromEvent, take } from 'rxjs';

export interface IMusic {
  id: number;
  title: string;
  src: string;
  thumbnail: string;
}

@Component({
  selector: 'app-music-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './music-widget.container.html',
  styleUrls: ['./music-widget.container.scss']
})
export class MusicWidgetContainer implements OnInit, AfterViewInit {

  readonly musicList: IMusic[] = [
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
      src: 'https://firebasestorage.googleapis.com/v0/b/develop-of-the-day.appspot.com/o/music%2Fdear.mp3?alt=media&token=cef15b70-7515-4fa1-8379-fe7933f95799'
    },
    {
      id: 3,
      title: 'Glitter',
      thumbnail: 'https://firebasestorage.googleapis.com/v0/b/develop-of-the-day.appspot.com/o/music%2Fglitter.png?alt=media&token=d1d96db3-8828-4179-9cbb-ef5f63fc1283',
      src: 'https://firebasestorage.googleapis.com/v0/b/develop-of-the-day.appspot.com/o/music%2Fglitter.mp3?alt=media&token=9c1eb999-7f67-4e82-92e1-513aa27ae02c'
    },
  ];
  currentMusicIndex = this.getRandomNumber(0, 2);
  volume = 50;
  
  isPlaying:boolean = false;

  selectedMusic:IMusic = this.musicList[this.currentMusicIndex];
  audio!:HTMLAudioElement; 

  ngOnInit() {
    this.audio = new Audio();
    this.audio.volume = this.volume / 100;
  }

  ngAfterViewInit(): void {
    const element = document.querySelector('#appBackground');
    if(!element) {
      return;
    }

    fromEvent(document, 'click')
      .pipe(
        take(1),
        finalize(() => this.onPlayCurrentMusic())
      )
      .subscribe();
  }

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  onPlayCurrentMusic() {
    this.audio.src = this.musicList[this.currentMusicIndex].src;
    this.audio.play();
    this.isPlaying = true;
  }
  
  onPlayNextMusic() {
    this.currentMusicIndex++;
    if (this.currentMusicIndex >= this.musicList.length) {
      this.currentMusicIndex = 0;
    }

    this.selectedMusic = this.musicList[this.currentMusicIndex];
    this.onPlayCurrentMusic();
  }
  
  onPlayPreviousMusic() {
    this.currentMusicIndex--;
    if (this.currentMusicIndex < 0) {
      this.currentMusicIndex = this.musicList.length - 1;
    }

    this.selectedMusic = this.musicList[this.currentMusicIndex];
    this.onPlayCurrentMusic();
  }

  onPaused() {
    this.isPlaying = false;
    this.audio.pause();
  }  

  onVolumeUp() {
    if(this.volume >= 100){
      return;
    }
    this.volume += 10;
    this.audio.volume = this.volume / 100;
  }

  onVolumeDown() {
    if(this.volume <= 0){
      return;
    }
    this.volume -= 10;
    this.audio.volume = this.volume / 100;
  }
}
