import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Observable } from 'rxjs';

import { PostRegisterContainers } from 'src/app/containers/post-register/post-register.containers';
import { ModalHandlerService } from 'src/app/services/modal-handler.service';
import { IPost, PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-manager',
  standalone: true,
  imports: [CommonModule, PostRegisterContainers, RouterModule],
  templateUrl: './post-manager.page.html'
})
export class PostManagerPage implements OnInit{

  posts$!: Observable<IPost[]>;
  isOpened$!: Observable<boolean>;

  constructor(
    private readonly postService: PostService,
    private readonly modalHandler: ModalHandlerService
  ) {}

  ngOnInit(): void {
    this.posts$ = this.postService.getAllPosts();
  }

  onCreatePost() {
    this.modalHandler.open({
      component: PostRegisterContainers
    });
  }

  onDeletePost(id: string) {
    const result = window.confirm('포스트를 삭제하시겠습니까?');
    if(!result) {
      return;
    }
    this.postService.deletePost(id).subscribe();
  }
}
