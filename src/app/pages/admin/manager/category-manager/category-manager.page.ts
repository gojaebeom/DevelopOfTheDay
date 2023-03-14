import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { CategoryService, ICategory } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-manager.page.html',
})
export class CategoryManagerPage implements OnInit {

  categories$!: Observable<ICategory[]>;

  constructor(
    private readonly categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
  }

  onCreateCategory() {
    const result = window.prompt('카테고리 생성');
    if (!result) {
      return;
    }
    // if(!allowKoEngNumber.test(result)) {
    //   return window.alert('카테고리명에 특수문자는 포함될 수 없습니다');
    // }

    this.categoryService.createCategory(result).subscribe();
  }

  onUpdateCategory(category: ICategory) {
    const result = window.prompt('카테고리 제목 수정', category.title);
    if (!result || result === category.title) {
      return;
    }
    const dto: ICategory = {
      ...category,
      title: result,
    };
    this.categoryService.updateCategory(dto).subscribe();
  }

  onDeleteCategory(id: string){
    const result = window.confirm('카테고리를 삭제하시겠습니까?');
    if(!result) {
      return;
    }
    this.categoryService.deleteCategory(id).subscribe();
  }
}
