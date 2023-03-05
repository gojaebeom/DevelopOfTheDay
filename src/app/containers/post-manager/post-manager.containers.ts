import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPost, PostService } from 'src/app/services/post.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-manager.containers.html'
})
export class PostManagerContainers implements OnInit{

  posts$!: Observable<IPost[]>;

  constructor(
    private readonly postService: PostService
  ) {}

  ngOnInit(): void {
    this.posts$ = this.postService.getAllPosts();
  }

  onCreatePost() {

  }

  onUpdatePost() {

  }

  onDeletePost(id: string) {

  }
}
