import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ProductAdmin } from '../../../../types/Product';
import { ProductService } from '../../../../services/product.service'; // import services
import { CategoryService } from '../../../../services/category.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { PaginationComponent } from '../../../../components/admin/pagination/pagination.component';
// import { EditProductsComponent } from '../edit-products/edit-products.component';

@Component({
  selector: 'categories',
  standalone: true,
  imports: [NgFor, NgIf, AddCategoryComponent, PaginationComponent],
  templateUrl: './all-categories.component.html',
})
export class CategoriesComponent implements OnInit {
  productService = inject(ProductService); // inject vao bien
  categoryService = inject(CategoryService); // inject vao bien

  productList: ProductAdmin[] = [];

  edittingCategoryId: number = 0;
  categories: any[] = [];
  totalCategories: any[] = [];

  isCreate: boolean = false;
  isEdit: boolean = false;

  offset: number = 0;
  limit: number = 10;
  currentPage: number = 1;

  totalPage: number = 4;

  nextPage() {
    this.offset += this.limit;
    this.currentPage++;
  }

  toggleModal() {
    this.isCreate = !this.isCreate;
  }

  toggleModalEdit() {
    this.isEdit = !this.isEdit;
  }

  deleteCategory(id: number) {
    let isConfirmed = confirm('Are you sure to delete this product?');
    if (isConfirmed) {
      this.categoryService.deleteCategory(id).subscribe((category) => {
        alert('Delete category successfully!');
        this.totalPage = Math.ceil(this.categories.length / this.limit);
        this.currentPage = 1;
        this.getAllCategoriesPagination();
      });
    }
  }

  showEditCategoryForm(id: number) {
    this.isEdit = !this.isEdit;
    this.edittingCategoryId = id;
  }

  ngOnInit(): void {
    this.productService
      .getProductListAdmin()
      .subscribe((products) => (this.productList = products)); // callApi.then(cb fuc)
    this.categoryService.getCategoryListAdmin().subscribe((categories) => {
      // get by limit
      this.totalCategories = categories;
      this.categories = categories;
      this.totalPage = Math.ceil(this.categories.length / this.limit);
      console.log(this.totalPage);
      this.getAllCategoriesPagination();
    });
  }

  getAllCategoriesPagination() {
    this.categories = this.totalCategories.slice(
      this.offset,
      this.offset + this.limit
    );
  }

  handlePrevPage() {
    if (this.offset - this.limit < 0) {
      return;
    }

    this.offset -= this.limit;
    this.currentPage--;

    this.getAllCategoriesPagination();
  }

  handleNextPage() {
    if (this.offset + this.limit >= this.totalCategories.length) {
      return;
    }
    this.offset += this.limit;
    this.currentPage++;

    this.getAllCategoriesPagination();
  }

  handlePages(i: number) {
    this.offset = this.limit * (i - 1);
    this.currentPage = i;

    this.getAllCategoriesPagination();
  }

  handleAddCategory() {
    this.categoryService.getCategoryListAdmin().subscribe((categories) => {
      this.totalCategories = categories;
      this.categories = categories;
      this.totalPage = Math.ceil(this.categories.length / this.limit);
      this.getAllCategoriesPagination();
    });
    this.toggleModal();
  }
}
