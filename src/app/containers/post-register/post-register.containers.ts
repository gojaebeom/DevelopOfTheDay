import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { Editor, NgxEditorModule } from 'ngx-editor';

import { Observable } from 'rxjs';

import { CategoryService, ICategory } from 'src/app/services/category.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-post-register',
  standalone: true,
  imports: [
    CommonModule,
    NgxEditorModule
  ],
  templateUrl: './post-register.containers.html'
})
export class PostRegisterContainers implements OnInit, AfterViewInit, OnDestroy {

  editor!: Editor;
  categories$!:Observable<ICategory[]>;

  constructor(
      public readonly theme: ThemeService,
      private readonly categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.editor = new Editor();

    this.categories$ = this.categoryService.getCategories();
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
}
