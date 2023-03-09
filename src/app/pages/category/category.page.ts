import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Observable, tap, throwError } from 'rxjs';

import { CategoryService } from 'src/app/services/category.service';
import { ICategoryWithPosts, PostCategoryService } from 'src/app/services/post-category.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './category.page.html'
})
export class CategoryPage implements OnInit{

  categoryWithPosts$!:Observable<ICategoryWithPosts>;

  constructor(
    private readonly categoryServic: CategoryService,
    private readonly postService: PostService,
    private readonly postCategoryService: PostCategoryService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap((event:any)=> {
          if(!event.id) {
            throwError(() => 'not found category');
          }
          console.log(event);
          console.log(event.id);
          const category$ = this.categoryServic.getCategory(event.id);
          const posts$ = this.postService.getPostsBy(event.id);
          this.categoryWithPosts$ = this.postCategoryService.getCategoryWithPosts(category$, posts$);
        })
      )
      .subscribe();
  }
}
