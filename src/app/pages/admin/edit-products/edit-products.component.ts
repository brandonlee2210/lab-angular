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
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { ProductAdmin } from '../../../types/Product';

@Component({
  selector: 'app-edit-products',
  standalone: true,
  imports: [CommonModule, NgIf, ReactiveFormsModule],
  templateUrl: './edit-products.component.html',
  styleUrl: './edit-products.component.css',
})
export class EditProductsComponent implements OnInit {
  @Output() handleCloseEditForm = new EventEmitter<any>();
  @Output() handleEditProduct = new EventEmitter<any>();
  @Input() productId: number = 0;
  @Input() categories: any[] = [];
  productService = inject(ProductService); //

  // get data product detail
  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe((product) => {
      this.editProductForm.setValue(product);
    });
  }

  // auto generate id
  editProductForm = new FormGroup({
    id: new FormControl(this.productId),

    title: new FormControl(''),

    price: new FormControl(0),

    description: new FormControl(''),

    category: new FormControl(''),
  });

  constructor() {
    this.handleCloseEditForm = new EventEmitter();
  }

  closeForm() {
    this.handleCloseEditForm.emit();
  }

  // show all input
  editProduct() {
    this.productService
      .editProduct(this.editProductForm.value as ProductAdmin, this.productId)
      .subscribe((product) => {
        console.log(product);
        alert('Edit product successfully!');
        this.closeForm();
        this.handleEditProduct.emit();
      });
  }
}
