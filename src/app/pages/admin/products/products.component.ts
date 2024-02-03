import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ProductAdmin } from '../../../types/Product';
import { ProductService } from '../../../services/product.service'; // import services
import { CategoryService } from '../../../services/category.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { EditProductsComponent } from '../edit-products/edit-products.component';
import { FilterComponent } from '../../../components/admin/filter/filter.component';
import { PaginationComponent } from '../../../components/admin/pagination/pagination.component';
import { SearchComponent } from '../../../components/admin/search/search.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    AddProductComponent,
    EditProductsComponent,
    FilterComponent,
    PaginationComponent,
    SearchComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  productService = inject(ProductService); // inject vao bien
  categoryService = inject(CategoryService); // inject vao bien

  productList: ProductAdmin[] = [];
  totalProducts: ProductAdmin[] = [];
  currentCategoryFilterName: string = '';
  currentSearchName: string = '';

  edittingProductId: number = 0;

  isCreate: boolean = false;
  isEdit: boolean = false;

  offset: number = 0;
  limit: number = 3;
  currentPage: number = 1;

  totalPage: number = 4;
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
    this.productService.getProductListAdmin().subscribe((products) => {
      this.productList = products;
      this.totalProducts = products;
      this.totalPage = Math.ceil(this.productList.length / this.limit);
      this.getALlProductsPagination();
    }); // callApi.then(cb fuc)
    this.categoryService
      .getCategoryListAdmin()
      .subscribe((categories) => (this.categories = categories));
  }

  nextPage() {
    this.offset += this.limit;
    this.currentPage++;
  }

  prevPage() {
    this.offset -= this.limit;
    this.currentPage--;
  }

  handleNextPage() {
    if (this.offset + this.limit < this.productList.length) {
      this.offset += this.limit;
      this.currentPage++;
      this.getALlProductsPagination();
    }
  }

  handlePrevPage() {
    if (this.offset - this.limit >= 0) {
      this.offset -= this.limit;
      this.currentPage--;
      this.getALlProductsPagination();
    }
  }

  handlePages(i: number) {
    debugger;
    this.offset = (i - 1) * this.limit;
    this.currentPage = i;

    this.getALlProductsPagination();
  }

  getALlProductsPagination() {
    debugger;
    if (this.currentCategoryFilterName || this.currentSearchName) {
      this.productList = this.totalProducts.filter(
        (product) =>
          product!.title!.includes(this.currentSearchName) &&
          product!.category!.includes(this.currentCategoryFilterName)
      );

      this.totalPage = Math.ceil(this.productList.length / this.limit);

      this.productList = this.productList.slice(
        this.offset,
        this.offset + this.limit
      );
    } else {
      this.totalPage = Math.ceil(this.totalProducts.length / this.limit);
      this.productList = this.totalProducts.slice(
        this.offset,
        this.offset + this.limit
      );
    }
  }

  handleFilter(categoryId: number | string) {
    this.currentPage = 1;
    this.offset = 0;
    let categoryFilterName = this.categories.find(
      (category) => category.id == categoryId
    )?.title;
    this.currentCategoryFilterName = categoryFilterName || '';
    if (!categoryId || categoryId == 'Select a category') {
      this.productList = this.totalProducts;
      this.totalPage = Math.ceil(this.productList.length / this.limit);
      this.getALlProductsPagination();
    } else {
      this.productList = this.totalProducts.filter(
        (product) => product.category === categoryFilterName
      );

      this.getALlProductsPagination();

      this.totalPage = Math.ceil(this.productList.length / this.limit);
    }
  }

  handleSearch(searchName: any) {
    this.currentPage = 1;
    this.offset = 0;
    this.currentSearchName = searchName.search;
    this.productList = this.totalProducts.filter((product) =>
      product!.title!.toLowerCase().includes(searchName.search.toLowerCase())
    );
    this.getALlProductsPagination();
  }
}
