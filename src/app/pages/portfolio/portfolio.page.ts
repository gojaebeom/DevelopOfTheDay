import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './portfolio.page.html'
})
export class PortfolioPage implements OnInit, AfterViewInit{

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      window.alert('페이지가 준비중이에요!\n나중에 다시 들러주세요 ^~^');
      this.router.navigateByUrl('/');
    }, 500);
  }
}
