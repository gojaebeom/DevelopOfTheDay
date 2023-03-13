import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Observable, of, switchMap, tap, throwError, zip } from 'rxjs';
import { LoadingContainer } from 'src/app/containers/loading/loading.container';

import { CategoryService } from 'src/app/services/category.service';
import { DisqusService } from 'src/app/services/disqus.service';
import { IPostWithCategory, PostCategoryService } from 'src/app/services/post-category.service';
import { PostService } from 'src/app/services/post.service';

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
export class PostPage implements OnInit, AfterViewInit{

  post$!:Observable<IPostWithCategory>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private readonly postService: PostService,
    private readonly categoryService: CategoryService,
    private readonly postCategoryService: PostCategoryService,
    private readonly route: ActivatedRoute,
    private readonly disqusService: DisqusService
  ) {}

  ngOnInit(): void {
    this.route.params
    .pipe(
      tap((event:any) => {
        if(!event.id){
          throwError(() => 'not found post');
        }

        this.disqusService.init(event.id);

        const catetories$ = this.categoryService.getCategories();
        const post$ = this.postService.getPost(event.id);

        this.post$ = this.postCategoryService.getPostWithCategory(post$, catetories$);
      }),
    )
    .subscribe();
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const element = document.querySelector('#appBackground');
    element?.scrollTo({
      top: 0
    });
  }
}
