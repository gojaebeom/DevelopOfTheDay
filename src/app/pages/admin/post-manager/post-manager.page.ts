import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Observable } from 'rxjs';

import { IPost, PostService } from 'src/app/services/post.service';
import { PostRegisterContainers } from 'src/app/containers/post-register/post-register.containers';
import { PostRegisterHandlerService } from 'src/app/services/post-register-handler.service';

@Component({
  selector: 'app-post-manager',
  standalone: true,
  imports: [CommonModule, PostRegisterContainers],
  providers: [PostRegisterHandlerService],
  templateUrl: './post-manager.page.html'
})
export class PostManagerPage implements OnInit{

  posts$!: Observable<IPost[]>;
  isOpened$!: Observable<boolean>;

  constructor(
    private readonly postService: PostService,
    private readonly postRegisterHandler: PostRegisterHandlerService
  ) {}

  ngOnInit(): void {
    this.posts$ = this.postService.getAllPosts();
    this.isOpened$ = this.postRegisterHandler.isOpened();
  }

  onCreatePost() {
    this.postRegisterHandler.open();
  }

  onUpdatePost() {

  }

  onDeletePost(id: string) {

  }
}
