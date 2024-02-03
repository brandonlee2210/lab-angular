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
import { UserService } from '../../../../services/user.service';
import { UserAdmin } from '../../../../types/User';

@Component({
  selector: 'app-add-users',
  standalone: true,
  imports: [CommonModule, NgIf, ReactiveFormsModule],
  templateUrl: './add-users.component.html',
  styleUrl: './add-users.component.css',
})
export class AddUsersComponent implements OnInit {
  @Output() handleCloseForm = new EventEmitter<any>();
  @Output() handleAddCategory = new EventEmitter<any>();
  @Input() categories: any[] = [];
  // productService = inject(ProductService); //
  categoryService = inject(UserService); //

  // auto generate id
  addCategoryForm = new FormGroup({
    id: new FormControl(Math.floor(Math.random() * 10000)),

    email: new FormControl('', [Validators.required, Validators.minLength(4)]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  constructor() {
    this.handleCloseForm = new EventEmitter();
  }

  ngOnInit(): void {
    this.categoryService
      .getUserListAdmin()
      .subscribe((categories) => (this.categories = categories));
  }

  closeForm() {
    this.handleCloseForm.emit();
  }

  // show all input
  addCategory() {
    if (this.addCategoryForm.invalid) {
      return;
    }

    this.categoryService
      .addUser(this.addCategoryForm.value as UserAdmin)
      .subscribe((product) => {
        alert('Add User successfully!');
        this.handleAddCategory.emit();
      });
  }
}
