import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { forkJoin, map, Observable, of, switchMap, take, tap, zip } from 'rxjs';

import { CategoryService, ICategory } from 'src/app/services/category.service';
import { IPostWithCategory, PostCategoryService } from 'src/app/services/post-category.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.page.html',
})
export class HomePage implements OnInit {

  categories$!:Observable<ICategory[]>;
  latestPosts$!:Observable<IPostWithCategory[]>;

  constructor(
    private readonly postService: PostService,
    private readonly categoryService: CategoryService,
    private readonly postCategoryService: PostCategoryService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories()
    this.latestPosts$ = this.postCategoryService.getPostsWithCategory(
      this.postService.getLatestPosts(), 
      this.categories$
    );
  }
}
