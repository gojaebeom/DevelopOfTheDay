import { AfterViewInit, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { DecorateBoxHandlerService } from './services/UI/decorate-box-handler.service';
import { Theme, ThemeService } from './services/UI/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{

  theme$!: Observable<Theme>;

  constructor(
    private readonly themeService: ThemeService,
    private readonly decorateBoxHandler: DecorateBoxHandlerService,
  ) { }

  ngOnInit(): void {
    this.theme$ = this.themeService.getTheme();
  }

  ngAfterViewInit(): void {
    this.decorateBoxHandler.toggleObserver();
  }
}
