import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Editor, NgxEditorModule, toHTML } from 'ngx-editor';

import { Observable, tap } from 'rxjs';

import { CategoryService, ICategory } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-register',
  standalone: true,
  imports: [
    CommonModule,
    NgxEditorModule,
    ReactiveFormsModule
  ],
  templateUrl: './post-register.containers.html'
})
export class PostRegisterContainers implements OnInit, AfterViewInit, OnDestroy {

  categories$!:Observable<ICategory[]>;

  editor!: Editor;
  formGroup!: FormGroup;
  

  constructor(
      private readonly categoryService: CategoryService,
      private readonly postService: PostService
  ) { }

  ngOnInit(): void {
    this.editor = new Editor();
    this.categories$ = this.categoryService.getCategories();

    this.formGroup = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      categoryId: new FormControl(),
      content: new FormControl()
    });
  }

  ngAfterViewInit(): void {
    
  }

  ngOnDestroy(): void {
    this.editor.destroy();
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
  }

  copyToClipboard(content: string) {
    const markdownContent = `![image](${content})`;

    navigator.clipboard.writeText(markdownContent).then(() => {
      console.log('Copied to clipboard:', markdownContent);
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

    console.log(result);
  }

  formSubmit() {
    console.log(this.formGroup.get('content')?.value);

    const formData = this.formGroup.getRawValue();
    formData.content = toHTML(formData.content);

    this.postService.create(formData)
      .pipe(
        tap(console.log)
      )
      .subscribe();
  }
}
