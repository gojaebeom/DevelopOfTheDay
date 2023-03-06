import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Theme, ThemeService } from 'src/app/services/theme.service';
import { DecorateBoxHandlerService } from 'src/app/services/decorate-box-handler.service';

@Component({
  selector: 'app-decorate-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './decorate-box.container.html'
})
export class DecorateBoxContainer {

  constructor(
    public readonly theme: ThemeService,
    public readonly handler: DecorateBoxHandlerService
  ) { }

  onChangeTheme(theme: Theme) {
    this.theme.changeTheme(theme);
  }
}
