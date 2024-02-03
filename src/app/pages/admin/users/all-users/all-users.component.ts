import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ProductAdmin } from '../../../../types/Product';
import { UserService } from '../../../../services/user.service';
import { AddUsersComponent } from '../add-users/add-users.component';
import { EditUsersComponent } from '../edit-users/edit-users.component';
import { PaginationComponent } from '../../../../components/admin/pagination/pagination.component';
// import { EditProductsComponent } from '../edit-products/edit-products.component';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [
    NgFor,
    EditUsersComponent,
    NgIf,
    AddUsersComponent,
    PaginationComponent,
  ],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css',
})
export class AllUsersComponent implements OnInit {
  userService = inject(UserService); // inject vao bien

  edittingUserId: number = 0;

  isCreate: boolean = false;
  isEdit: boolean = false;

  users: any[] = [];

  toggleModal() {
    this.isCreate = !this.isCreate;
  }

  toggleModalEdit() {
    this.isEdit = !this.isEdit;
  }

  deleteUser(id: number) {
    let isConfirmed = confirm('Are you sure to delete this product?');
    if (isConfirmed) {
      this.userService.deleteUser(id).subscribe((category) => {
        alert('Delete category successfully!');

        this.userService.getUserListAdmin().subscribe((users) => {
          this.users = users;
        });
      });
    }
  }

  handleAddUser() {
    this.userService.getUserListAdmin().subscribe((users) => {
      this.users = users;
    });

    this.toggleModal();
  }

  handleEditUser() {
    this.userService.getUserListAdmin().subscribe((users) => {
      this.users = users;
    });

    this.toggleModalEdit();
  }

  showEditCategoryForm(id: number) {
    this.isEdit = !this.isEdit;
    this.edittingUserId = id;
  }

  ngOnInit(): void {
    this.userService.getUserListAdmin().subscribe((users) => {
      this.users = users;
    });
  }
}
