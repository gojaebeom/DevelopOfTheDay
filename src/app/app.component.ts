import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Theme, ThemeService } from './services/UI/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  theme$!: Observable<Theme>;

  constructor(
    private readonly themeService: ThemeService,
  ) { }

  ngOnInit(): void {
    this.theme$ = this.themeService.getTheme();
  }
}
