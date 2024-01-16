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
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { ProductAdmin } from '../../../types/Product';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, NgIf, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  @Output() handleCloseForm = new EventEmitter<any>();
  @Output() handleAddProduct = new EventEmitter<any>();
  @Input() categories: any[] = [];
  productService = inject(ProductService); //
  categoryService = inject(CategoryService); //

  // auto generate id
  addProductForm = new FormGroup({
    id: new FormControl(Math.floor(Math.random() * 10000)),

    title: new FormControl('', [Validators.required, Validators.minLength(4)]),

    price: new FormControl('', [Validators.required]),

    description: new FormControl(''),

    category: new FormControl(''),
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
  addProduct() {
    // validate and bind message to span
    if (this.addProductForm.invalid) {
      console.log(this.addProductForm);
      alert('Please fill out all required fields!');
      return;
    }

    this.productService
      .addProduct(this.addProductForm.value as ProductAdmin)
      .subscribe((product) => {
        alert('Add product successfully!');
        this.handleAddProduct.emit();
        this.closeForm();
      });
  }
}
