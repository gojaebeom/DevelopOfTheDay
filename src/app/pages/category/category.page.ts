import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Observable, Subscription, tap, throwError } from 'rxjs';

import { LoadingContainer } from 'src/app/containers/loading/loading.container';
import { CategoryService } from 'src/app/services/category.service';
import { ICategoryWithPosts, PostCategoryService } from 'src/app/services/post-category.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoadingContainer
  ],
  templateUrl: './category.page.html'
})
export class CategoryPage implements OnInit, OnDestroy {

  categoryWithPosts$!:Observable<ICategoryWithPosts>;
  subscription?:Subscription;

  constructor(
    private readonly categoryServic: CategoryService,
    private readonly postService: PostService,
    private readonly postCategoryService: PostCategoryService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(
        tap((event:any)=> {
          if(!event.id) {
            throwError(() => 'not found category');
          }
          const category$ = this.categoryServic.getCategory(event.id);
          const posts$ = this.postService.getPostsBy(event.id);
          this.categoryWithPosts$ = this.postCategoryService.getCategoryWithPosts(category$, posts$);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
