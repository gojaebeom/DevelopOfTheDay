import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Theme, ThemeService } from 'src/app/services/UI/theme.service';

@Component({
  selector: 'app-theme-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-widget.container.html'
})
export class ThemeWidgetContainer {

  constructor(
    private readonly themeService: ThemeService,
  ) {}

  onChangeTheme(theme: Theme) {
    this.themeService.changeTheme(theme);
  }
}
