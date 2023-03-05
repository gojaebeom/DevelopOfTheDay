import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PostRegisterHandlerService } from '../../services/post-register-handler.service';

@Component({
  selector: 'app-post-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-register.containers.html'
})
export class PostRegisterContainers implements OnInit{

  constructor(
      private readonly postRegisterHandler: PostRegisterHandlerService
  ) { }

  ngOnInit(): void {
    
  }

  onClose() {
    this.postRegisterHandler.close();
  }
}
