import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { tap } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './admin.page.html'
})
export class AdminPage implements OnInit{

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const result = window.prompt('어드민코드를 입력하세요');
    if(!result) {
      this.router.navigateByUrl('/');
      return;
    }

    this.authService.canActivateBy(result)
      .pipe(
        tap(res => {
          if(!res.exists()) {
            window.alert('잘못된 접근입니다.');
            this.router.navigateByUrl('/');
            return;
          }
        })
      )
      .subscribe();
  }
}
