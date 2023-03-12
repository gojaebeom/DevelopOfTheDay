import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { debounceTime, Observable, Subject, tap } from 'rxjs';

import { LoadingContainer } from 'src/app/containers/loading/loading.container';
import { CategoryService, ICategory } from 'src/app/services/category.service';
import { IPostWithCategory, PostCategoryService } from 'src/app/services/post-category.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    LoadingContainer
  ],
  templateUrl: './home.page.html',
})
export class HomePage implements OnInit, AfterViewInit {

  categories$!:Observable<ICategory[]>;
  latestPosts$!:Observable<IPostWithCategory[]>;

  private clickMe$ = new Subject();
  private counter = 0;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly postService: PostService,
    private readonly categoryService: CategoryService,
    private readonly postCategoryService: PostCategoryService,
    private readonly router: Router,
  ) {
    this.clickMe$
    .pipe(
        tap(() => console.log(this.counter)),
        debounceTime(1000),
        tap(() => this.counter = 0),
    ).subscribe();
  }


  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories()
    this.latestPosts$ = this.postCategoryService.getPostsWithCategory(
        this.postService.getLatestPosts(), 
        this.categories$
    );
  }

  ngAfterViewInit() {
    if(!isPlatformBrowser(this.platformId)) {
      return;
    }

    // 서비스로 분리하여 재사용 필요
    const imgEls = document.querySelectorAll('img');
    imgEls.forEach((img:any) => {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
    })
  }

  clickMe() {
    this.counter ++;
    this.clickMe$.next(true);

    if(this.counter < 5) {
      return;
    }

    this.router.navigateByUrl('/admin');
  }
}
