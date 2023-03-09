import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Observable, of, switchMap, tap, throwError, zip } from 'rxjs';

import { CategoryService } from 'src/app/services/category.service';
import { IPostWithCategory, PostCategoryService } from 'src/app/services/post-category.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post.page.html'
})
export class PostPage implements OnInit{

  post$!:Observable<IPostWithCategory>;

  constructor(
    private readonly postService: PostService,
    private readonly categoryService: CategoryService,
    private readonly postCategoryService: PostCategoryService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
    .pipe(
      tap((event:any) => {
        if(!event.id){
          throwError(() => 'not found user');
        }

        const catetories$ = this.categoryService.getCategories();
        const post$ = this.postService.getPost(event.id);

        this.post$ = this.postCategoryService.getPostWithCategory(post$, catetories$);
      }),
    )
    .subscribe();
  }
}
