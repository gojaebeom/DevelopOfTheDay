import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Observable } from 'rxjs';

import { IPost, PostService } from 'src/app/services/post.service';
import { ModalHandlerService } from 'src/app/services/UI/modal-handler.service';

@Component({
  selector: 'app-post-manager',
  standalone: true,
  imports: [CommonModule, RouterModule],
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

  onDeletePost(id: string) {
    const result = window.confirm('포스트를 삭제하시겠습니까?');
    if(!result) {
      return;
    }
    this.postService.deletePost(id).subscribe();
  }
}
