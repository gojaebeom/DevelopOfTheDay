import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';

import { CategoryManagerContainers } from 'src/app/containers/category-manager/category-manager.containers';
import { PostManagerContainers } from 'src/app/containers/post-manager/post-manager.containers';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule, 
    CategoryManagerContainers,
    PostManagerContainers
  ],
  templateUrl: './admin.page.html'
})
export class AdminPage implements AfterViewInit{

  selectedTab: SelectedTab = 'CATEGORY';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
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

    buttons.forEach(button => {
      button.addEventListener('click', event => {
        const button = (event.target) as HTMLButtonElement;
        tabActiveBox.style.width = button.offsetWidth + 'px';
        tabActiveBox.style.left = button.offsetLeft + 'px';


        switch(button.dataset['id']) {
          case 'CATEGORY': 
            this.selectedTab = 'CATEGORY';
            return;
          case 'POST': 
            this.selectedTab = 'POST';
            return;
          case 'MUSIC': 
            this.selectedTab = 'MUSIC';
            return;
          default:
            return;
        }
      })
    });
  }
}

type SelectedTab = 'CATEGORY' | 'POST' | 'MUSIC';
