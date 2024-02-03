import {
  Component,
  EventEmitter,
  Output,
  inject,
  OnInit,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { CategoryService } from '../../../../services/category.service';
import { ProductAdmin } from '../../../../types/Product';
import { CategoryAdmin } from '../../../../types/Category';

@Component({
  selector: 'app-edit-categories',
  standalone: true,
  imports: [CommonModule, NgIf, ReactiveFormsModule],
  templateUrl: './edit-categories.component.html',
})
export class EditCategoriesComponent implements OnInit {
  @Output() handleCloseEditForm = new EventEmitter<any>();
  @Output() handleEditCategory = new EventEmitter<any>();
  @Input() categoryId: number = 0;
  @Input() categories: any[] = [];
  productService = inject(ProductService); //
  categoryService = inject(CategoryService);

  // get data product detail
  ngOnInit(): void {
    this.categoryService.getCategory(this.categoryId).subscribe((category) => {
      this.editCategoryForm.setValue(category);
    });
  }

  // auto generate id
  editCategoryForm = new FormGroup({
    id: new FormControl(this.categoryId),

    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor() {
    this.handleCloseEditForm = new EventEmitter();
  }

  closeForm() {
    this.handleCloseEditForm.emit();
  }

  // show all input
  editCategory() {
    this.categoryService
      .editCategory(this.editCategoryForm.value as CategoryAdmin)
      .subscribe((category) => {
        this.handleEditCategory.emit(category);
        alert('Edit category successfully!');
      });
  }
}
