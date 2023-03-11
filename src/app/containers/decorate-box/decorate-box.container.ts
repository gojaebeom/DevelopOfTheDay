import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Observable } from 'rxjs';

import { DecorateBoxHandlerService } from 'src/app/services/UI/decorate-box-handler.service';
import { ThemeWidgetContainer } from '../theme-widget/theme-widget.container';

@Component({
  selector: 'app-decorate-box',
  standalone: true,
  imports: [
    CommonModule,
    ThemeWidgetContainer,
  ],
  templateUrl: './decorate-box.container.html'
})
export class DecorateBoxContainer implements OnInit{

  isOpened$!:Observable<string>;

  constructor(
    private readonly handler: DecorateBoxHandlerService
  ) { }

  ngOnInit(): void {
    this.isOpened$ = this.handler.isOpened();
  }

  onOpenDecorateBox() {
    this.handler.open();
  }

  onCloseDecorateBox(event:Event) {
    if(document.querySelector('#decorateBoxWrap') !== event.target) {
      return;
    }
    this.handler.close();
  }
}
