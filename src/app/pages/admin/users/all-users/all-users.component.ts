import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ProductAdmin } from '../../../../types/Product';
import { ProductService } from '../../../../services/product.service'; // import services
import { CategoryService } from '../../../../services/category.service';
import { AddUsersComponent } from '../add-users/add-users.component';
import { PaginationComponent } from '../../../../components/admin/pagination/pagination.component';
// import { EditProductsComponent } from '../edit-products/edit-products.component';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [NgFor, NgIf, AddUsersComponent, PaginationComponent],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css',
})
export class AllUsersComponent implements OnInit {
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
      });
    }
  }

  showEditCategoryForm(id: number) {
    this.isEdit = !this.isEdit;
    this.edittingCategoryId = id;
  }

  ngOnInit(): void {}
}
