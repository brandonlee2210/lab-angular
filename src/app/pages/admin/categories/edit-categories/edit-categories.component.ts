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
import { ProductAdmin } from '../../../../types/Product';

@Component({
  selector: 'app-edit-categories',
  standalone: true,
  imports: [CommonModule, NgIf, ReactiveFormsModule],
  templateUrl: './edit-categories.component.html',
})
export class EditProductsComponent implements OnInit {
  @Output() handleCloseEditForm = new EventEmitter<any>();
  @Output() handleEditCategory = new EventEmitter<any>();
  @Input() categoryId: number = 0;
  @Input() categories: any[] = [];
  productService = inject(ProductService); //

  // get data product detail
  ngOnInit(): void {}

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
  editCategory() {}
}
