import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { debounceTime, Observable, Subject, tap } from 'rxjs';

import { LoadingContainer } from 'src/app/containers/loading/loading.container';
import { CategoryService, ICategory } from 'src/app/services/category.service';
import { DisqusService } from 'src/app/services/disqus.service';
import { PlatformService } from 'src/app/services/platform.service';
import { IPostWithCategory, PostCategoryService } from 'src/app/services/post-category.service';
import { PostService } from 'src/app/services/post.service';
import { ImageEffectService } from 'src/app/services/UI/image-effect.service';

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
    private readonly platform: PlatformService,
    private readonly disqusService: DisqusService,
    private readonly postService: PostService,
    private readonly categoryService: CategoryService,
    private readonly postCategoryService: PostCategoryService,
    private readonly imageEffect: ImageEffectService,
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

    this.platform.onBrowser(() => this.disqusService.init('guestBook'));
  }

  ngAfterViewInit() {
    this.platform.onBrowser(()=> this.imageEffect.imagePadeIn());
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
