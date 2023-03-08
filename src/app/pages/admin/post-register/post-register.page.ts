import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { finalize, iif, Observable, of, switchMap, tap } from 'rxjs';

import { Editor, NgxEditorModule, toHTML, Toolbar } from 'ngx-editor';

import { CategoryService, ICategory } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';
import { StorageService } from 'src/app/services/storage.service';

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
export class PostRegisterPage implements OnInit, AfterViewInit {

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
    private readonly categoryService: CategoryService,
    private readonly storageService: StorageService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.editor = new Editor();
    this.categories$ = this.categoryService.getCategories();

    this.formGroup = new FormGroup({
      categoryId: new FormControl(),
      title: new FormControl(),
      content: new FormControl()
    });

    this.route.params
      .pipe(
        switchMap((event:any) => {
          if(!event.id) {
            return of(false);
          }

          return this.postService.getPost(event.id)
            .pipe(
              tap(post => {
                this.formGroup.patchValue(post);
                this.formGroup.addControl('id', new FormControl(post.id));
                this.formGroup.addControl('createdAt', new FormControl(post.createdAt));
              }),
            )
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const images = document.querySelectorAll('.NgxEditor__Content img');
      const uploadedImages:string[] = [];
      images.forEach((img:any) => {
        if(!img.currentSrc){
          return;
        }
        uploadedImages.push(img.currentSrc);
      });
      this.uploadedImages = uploadedImages;
    }, 1000);
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
    if(typeof formData.content !== 'string') {
      formData.content = toHTML(formData.content);
    }

    let obs$:Observable<any>;
    if(!formData.id) {
      obs$ = this.postService.createPost(formData);
    } else {
      obs$  = this.postService.updatePost(formData);
    }

    obs$
    .pipe(
      finalize(() => {
        console.log('완료!');
        this.router.navigateByUrl('/admin/manager/posts');
      })
    )
    .subscribe();
  }
}
