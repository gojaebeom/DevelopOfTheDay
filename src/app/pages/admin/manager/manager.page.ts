import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { fromEvent, tap } from 'rxjs';

import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './manager.page.html'
})
export class ManagerPage {

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
    const type = this.router.url.split('admin/manager/').pop();

    if (!tabActiveBox || !type) {
      return;
    }

    switch (type) {
      case 'categories':
        tabActiveBox.style.width = buttons[0].offsetWidth + 'px';
        tabActiveBox.style.left = buttons[0].offsetLeft + 'px';
        return;
      case 'posts':
        tabActiveBox.style.width = buttons[1].offsetWidth + 'px';
        tabActiveBox.style.left = buttons[1].offsetLeft + 'px';
        return;
      default:
        return;
    }
  }
}
