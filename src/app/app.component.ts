import { AfterViewInit, Component } from '@angular/core';

import { DecorateBoxHandlerService } from './services/decorate-box-handler.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{

  constructor(
    public readonly theme: ThemeService,
    private readonly decorateBoxHandler: DecorateBoxHandlerService
  ) { }

  ngAfterViewInit(): void {
    this.decorateBoxHandler.toggleObserver();
  }
}
