import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Observable, switchMap, tap } from 'rxjs';

import { Editor, NgxEditorModule, toHTML, Toolbar, ToolbarCustomMenuItem } from 'ngx-editor';

import { StorageService } from 'src/app/services/storage.service';
import { PostService } from 'src/app/services/post.service';
import { CategoryService, ICategory } from 'src/app/services/category.service';
import { ModalContainer } from 'src/app/containers/modal/modal.container';
import { PostImageService } from 'src/app/services/post-image.service';

@Component({
  selector: 'app-post-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgxEditorModule
  ],
  templateUrl: './post-register.page.html'
})
export class PostRegisterPage implements OnInit {

  categories$!:Observable<ICategory[]>;

  editor!: Editor;
  toolbar: Toolbar = [
    ['image','link'],
    [{ heading: ['h1', 'h2', 'h3'] }],
    ['bold', 'underline', 'strike','blockquote'],
    ['ordered_list', 'bullet_list'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right']    
  ];

  uploadedImages: string[] = [];
  formGroup!: FormGroup;

  constructor(
    private readonly postService: PostService,
    private readonly postImageService: PostImageService,
    private readonly categoryService: CategoryService,
    private readonly storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.editor = new Editor();
    this.categories$ = this.categoryService.getCategories();

    this.formGroup = new FormGroup({
      categoryId: new FormControl(),
      title: new FormControl(),
      content: new FormControl()
    });
  }

  onUploadImage(event: any) {
    const file = event.target.files[0];
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];
  
    if(!file) {
      return;
    }
    if (!allowedTypes.includes(file.type)) {
      alert('이미지 파일 형식이 올바르지 않습니다. 이미지형식의 파일만 선택해주세요.');
      return;
    }

    this.storageService.uploadFile(file, "images")
    .pipe(
      tap(res => {
        console.log(res);
        this.uploadedImages.push(res)
      })
    )
    .subscribe();
  }

  copyToClipboard(content: string) {
    navigator.clipboard.writeText(content).then(() => {
      console.log('Copied to clipboard:', content);
    }, (error) => {
      console.error('Copy to clipboard failed:', error);
    });
  }

  removeImageFile(content: string) {
    const result = content.split('%2F').pop()?.split('?').shift();
    if(!result) {
      window.alert('파일 이름을 가져오는데 문제가 발생했습니다.');
      return;
    }

    this.storageService.removeFile(`/images/${result}`)
      .pipe(
        tap(() => this.uploadedImages = this.uploadedImages.filter(image => image !== content))
    )
    .subscribe();
  }

  submitForm() {
    const formData = this.formGroup.getRawValue();
    
    if(!formData.title) {
      return window.alert('제목을 입력하세요.');
    }
    if(!formData.categoryId) {
      return window.alert('카테고리를 선택하세요.');
    }
    if(!formData.content) {
      return window.alert('내용을 입력하세요.');
    }
    
    formData.content = toHTML(formData.content);
    
    this.postService.createPost(formData)
      .pipe(
        switchMap(postId => this.postImageService.createImage(postId, this.uploadedImages))
      )
      .subscribe();
  }
}
