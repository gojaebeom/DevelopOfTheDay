import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Observable, Subscription, tap, throwError } from 'rxjs';
import { LoadingContainer } from 'src/app/containers/loading/loading.container';

import { CategoryService } from 'src/app/services/category.service';
import { DisqusService } from 'src/app/services/disqus.service';
import { PlatformService } from 'src/app/services/platform.service';
import { IPostWithCategory, PostCategoryService } from 'src/app/services/post-category.service';
import { PostService } from 'src/app/services/post.service';
import { ImageEffectService } from 'src/app/services/UI/image-effect.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    LoadingContainer
  ],
  templateUrl: './post.page.html'
})
export class PostPage implements OnInit, AfterViewInit, OnDestroy{

  post$!:Observable<IPostWithCategory>;
  subscription?: Subscription;

  constructor(
    private readonly platform: PlatformService,
    private readonly disqusService: DisqusService,
    private readonly postService: PostService,
    private readonly categoryService: CategoryService,
    private readonly postCategoryService: PostCategoryService,
    private readonly route: ActivatedRoute,
    private readonly imageEffect: ImageEffectService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params
    .pipe(
      tap((event:any) => {
        if(!event.id){
          throwError(() => 'not found post');
        }

        this.platform.onBrowser(() => this.disqusService.init(event.id));

        const catetories$ = this.categoryService.getCategories();
        const post$ = this.postService.getPost(event.id);
        
        this.post$ = this.postCategoryService.getPostWithCategory(post$, catetories$);
      }),
    )
    .subscribe();
  }

  ngAfterViewInit(): void {
    this.platform.onBrowser(() => {
      const element = document.querySelector('#appBackground');
      element?.scrollTo({
        top: 0
      });

      this.imageEffect.imagePadeIn();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
