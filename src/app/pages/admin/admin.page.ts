import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
  ],
  templateUrl: './admin.page.html'
})
export class AdminPage implements AfterViewInit{

  selectedTab: SelectedTab = 'CATEGORY';

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {  }

  ngAfterViewInit(): void {
    if(!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    const buttons = document.querySelectorAll('#tabButtonBox > button') as NodeListOf<HTMLButtonElement>;
    const tabActiveBox = document.querySelector('#tabActiveBox') as HTMLDivElement;

    if(!tabActiveBox) {
      return;
    }

    window.addEventListener('resize', () => {
      tabActiveBox.style.width =  buttons[0].offsetWidth + 'px';
      tabActiveBox.style.left =  buttons[0].offsetLeft + 'px';
    });

    this.route.url
      .pipe(
        tap(() => {
          const type = this.router.url.split('admin/').pop();
          
          switch(type) {
            case 'category-manager': 
              tabActiveBox.style.width =  buttons[0].offsetWidth + 'px';
              tabActiveBox.style.left =  buttons[0].offsetLeft + 'px';
              return;
            case 'post-manager': 
              tabActiveBox.style.width =  buttons[1].offsetWidth + 'px';
              tabActiveBox.style.left =  buttons[1].offsetLeft + 'px';
              return;
            case 'music-manager': 
              tabActiveBox.style.width =  buttons[2].offsetWidth + 'px';
              tabActiveBox.style.left =  buttons[2].offsetLeft + 'px';
              return;
            default:
              return;
          }
        })
      )
      .subscribe();
  }
}

type SelectedTab = 'CATEGORY' | 'POST' | 'MUSIC';
