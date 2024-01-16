import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ProductAdmin } from '../../../types/Product';
import { ProductService } from '../../../services/product.service'; // import services
import { CategoryService } from '../../../services/category.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { EditProductsComponent } from '../edit-products/edit-products.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, NgIf, AddProductComponent, EditProductsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  productService = inject(ProductService); // inject vao bien
  categoryService = inject(CategoryService); // inject vao bien

  productList: ProductAdmin[] = [];

  edittingProductId: number = 0;

  isCreate: boolean = false;
  isEdit: boolean = false;
  toggleModal() {
    this.isCreate = !this.isCreate;
  }

  categories: any[] = [];

  toggleModalEdit() {
    this.isEdit = !this.isEdit;
  }

  getProducts() {
    this.productService
      .getProductListAdmin()
      .subscribe((products) => (this.productList = products));
  }

  deleteProduct(id: number) {
    let isConfirmed = confirm('Are you sure to delete this product?');
    if (isConfirmed) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.productList = this.productList.filter(
          (product) => product.id !== id
        );
      });
    }
  }

  showEditProductForm(id: number) {
    this.isEdit = !this.isEdit;
    this.edittingProductId = id;
  }

  ngOnInit(): void {
    this.productService
      .getProductListAdmin()
      .subscribe((products) => (this.productList = products)); // callApi.then(cb fuc)
    this.categoryService
      .getCategoryListAdmin()
      .subscribe((categories) => (this.categories = categories));
  }
}
