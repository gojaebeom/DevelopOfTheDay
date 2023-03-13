import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

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
      id:1,
      title: '라테일 - where am i',
      thumbnail: 'https://firebasestorage.googleapis.com/v0/b/myblog-5feeb.appspot.com/o/music%2Flatail.jpeg?alt=media&token=a013a5ad-82a2-4ea9-898f-fadd98b0cabf',
      src: 'https://firebasestorage.googleapis.com/v0/b/myblog-5feeb.appspot.com/o/music%2F%E1%84%85%E1%85%A1%E1%84%90%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF%20OST%20%20where%20am%20i.mp3?alt=media&token=91a00be2-3711-4d2c-b871-bec7d59160eb'
    },
    {
      id:2,
      title: '라테일 - 프롤로그',
      thumbnail: 'https://firebasestorage.googleapis.com/v0/b/myblog-5feeb.appspot.com/o/music%2Flatail.jpeg?alt=media&token=a013a5ad-82a2-4ea9-898f-fadd98b0cabf',
      src: 'https://firebasestorage.googleapis.com/v0/b/myblog-5feeb.appspot.com/o/music%2F%E1%84%85%E1%85%A1%E1%84%90%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF%20prologue.mp3?alt=media&token=5a78dc30-2840-47d1-8b6f-e800a0e26d60'
    },
    {
      id:3,
      title: '라테일 - 용경',
      thumbnail: 'https://firebasestorage.googleapis.com/v0/b/myblog-5feeb.appspot.com/o/music%2Flatail.jpeg?alt=media&token=a013a5ad-82a2-4ea9-898f-fadd98b0cabf',
      src: 'https://firebasestorage.googleapis.com/v0/b/myblog-5feeb.appspot.com/o/music%2F%E1%84%85%E1%85%A1%E1%84%90%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF%20bgm%20%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%80%E1%85%A7%E1%86%BC.mp3?alt=media&token=db87013d-ea35-4d1e-a5f2-1175ed22468d'
    },
    {
      id:4,
      title: '테일즈위버 - Reminiscence',
      thumbnail: 'https://firebasestorage.googleapis.com/v0/b/myblog-5feeb.appspot.com/o/music%2FCUKwz61VEAQ55WW.png?alt=media&token=cb4682af-42ae-454d-b5f8-e4e825d3ba81',
      src: 'https://firebasestorage.googleapis.com/v0/b/myblog-5feeb.appspot.com/o/music%2FReminiscence.mp3?alt=media&token=34fc201a-6a67-46c3-b822-a5a367a05de7'
    },
    {
      id: 5,
      title: 'Last Canival',
      thumbnail: 'https://firebasestorage.googleapis.com/v0/b/myblog-5feeb.appspot.com/o/music%2FlastCanival.png?alt=media&token=8a613d65-3c06-45b7-8c69-5f8ef3eb4068',
      src: 'https://firebasestorage.googleapis.com/v0/b/myblog-5feeb.appspot.com/o/music%2FlastCarnival.mp3?alt=media&token=09f40e1e-4696-48b9-b150-458f37d52767'
    },
    {
      id: 6,
      title: 'Nanase - Dear',
      thumbnail: 'https://firebasestorage.googleapis.com/v0/b/myblog-5feeb.appspot.com/o/music%2Fdear.png?alt=media&token=a8f3b63d-0e75-42fa-b1aa-85916c7c7eec',
      src: 'https://firebasestorage.googleapis.com/v0/b/myblog-5feeb.appspot.com/o/music%2Fdear.mp3?alt=media&token=3af66780-d834-4b77-be1a-7ab904517f0c'
    },
    {
      id: 7,
      title: 'Glitter',
      thumbnail: 'https://firebasestorage.googleapis.com/v0/b/myblog-5feeb.appspot.com/o/music%2Fglitter.png?alt=media&token=18bc60db-e98d-414b-a277-c5bf9989db0f',
      src: 'https://firebasestorage.googleapis.com/v0/b/myblog-5feeb.appspot.com/o/music%2Fglitter.mp3?alt=media&token=b5f7fae7-1a01-40ab-af6d-b66fddffa1aa'
    },
  ];
  currentMusicIndex = this.getRandomNumber(0, 6);
  volume = 50;
  
  isPlaying:boolean = false;

  selectedMusic:IMusic = this.musicList[this.currentMusicIndex];
  audio!:HTMLAudioElement; 

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
  ) {}

  ngOnInit() { }

  ngAfterViewInit(): void {
    if(!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.audio = new Audio();
    this.audio.volume = this.volume / 100;

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

    this.audio.addEventListener('ended', () => {
      this.onPlayNextMusic();
    });
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

    this.isPlaying = false;
    this.selectedMusic = this.musicList[this.currentMusicIndex];
    this.onPlayCurrentMusic();
  }
  
  onPlayPreviousMusic() {
    if (this.audio.currentTime > 3) {
      this.audio.currentTime = 0;
      return;
    }

    this.currentMusicIndex--;
    if (this.currentMusicIndex < 0) {
      this.currentMusicIndex = this.musicList.length - 1;
    }

    this.isPlaying = false;
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
