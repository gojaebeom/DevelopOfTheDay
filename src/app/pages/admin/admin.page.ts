import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { fromEvent, tap } from 'rxjs';

import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './admin.page.html'
})
export class AdminPage implements AfterViewInit {

  constructor(
    public readonly theme: ThemeService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) { }

  ngAfterViewInit(): void {
    fromEvent(window, 'resize')
      .pipe(
        tap(() => this.changeTabActiveBox())
      )
      .subscribe();

    this.route.url
      .pipe(
        tap(() => this.changeTabActiveBox())
      )
      .subscribe();
  }

  private changeTabActiveBox() {
    const buttons = document.querySelectorAll('#tabButtonBox > button') as NodeListOf<HTMLButtonElement>;
    const tabActiveBox = document.querySelector('#tabActiveBox') as HTMLDivElement;
    const type = this.router.url.split('admin/').pop();

    if (!tabActiveBox || !type) {
      return;
    }

    switch (type) {
      case 'category-manager':
        tabActiveBox.style.width = buttons[0].offsetWidth + 'px';
        tabActiveBox.style.left = buttons[0].offsetLeft + 'px';
        return;
      case 'post-manager':
        tabActiveBox.style.width = buttons[1].offsetWidth + 'px';
        tabActiveBox.style.left = buttons[1].offsetLeft + 'px';
        return;
      case 'music-manager':
        tabActiveBox.style.width = buttons[2].offsetWidth + 'px';
        tabActiveBox.style.left = buttons[2].offsetLeft + 'px';
        return;
      default:
        return;
    }
  }
}
