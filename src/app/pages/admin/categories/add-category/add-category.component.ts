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
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryService } from '../../../../services/category.service';
import { CategoryAdmin } from '../../../../types/Category';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, NgIf, ReactiveFormsModule],
  templateUrl: './add-category.component.html',
})
export class AddCategoryComponent implements OnInit {
  @Output() handleCloseForm = new EventEmitter<any>();
  @Output() handleAddCategory = new EventEmitter<any>();
  @Input() categories: any[] = [];
  // productService = inject(ProductService); //
  categoryService = inject(CategoryService); //

  // auto generate id
  addCategoryForm = new FormGroup({
    id: new FormControl(Math.floor(Math.random() * 10000)),

    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor() {
    this.handleCloseForm = new EventEmitter();
  }

  ngOnInit(): void {
    this.categoryService
      .getCategoryListAdmin()
      .subscribe((categories) => (this.categories = categories));
  }

  closeForm() {
    this.handleCloseForm.emit();
  }

  // show all input
  addCategory() {
    this.categoryService
      .addCategory(this.addCategoryForm.value as CategoryAdmin)
      .subscribe((product) => {
        alert('Add category successfully!');
        this.handleAddCategory.emit();
      });
  }
}
