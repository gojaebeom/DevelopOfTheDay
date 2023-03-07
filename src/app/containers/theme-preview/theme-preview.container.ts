import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IThemeSystem, Theme, ThemeService } from 'src/app/services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-theme-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-preview.container.html'
})
export class ThemePreviewContainer implements OnInit{

  selectedTheme: Theme = 'HANAMI';

  theme$!:Observable<IThemeSystem>;
  showThemePriview$!:Observable<boolean>;

  constructor(
    private readonly themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.theme$ = this.themeService.getThemeSystem();
    this.showThemePriview$ = this.themeService.showThemePreview();
  }

  onChangeTheme(theme: Theme) {
    this.selectedTheme = theme;
    this.themeService.changeTheme(theme, {canSave: false});
  }

  onPickMyTheme() {
    this.themeService.changeTheme(this.selectedTheme);
  }
}
