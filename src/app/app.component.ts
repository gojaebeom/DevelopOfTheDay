import { isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';

import { DecorateBoxHandlerService } from './services/decorate-box-handler.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    public readonly theme: ThemeService,
    private readonly decorateBoxHandler: DecorateBoxHandlerService
  ) { }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.decorateBoxHandler.toggleObserver();
  }
}
