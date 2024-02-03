import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgForm, NgModel } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NgFor],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent implements OnInit {
  @Output() handleFilter = new EventEmitter<any>();
  categoryService = inject(CategoryService); // \

  currentCategoryFilterId: number = 0;
  categories: any[] = [];
  ngOnInit(): void {
    this.categoryService.getCategoryList().subscribe((categories) => {
      this.categories = categories;
    });
  }

  filterByCategory(categoryId: any) {
    console.log(categoryId.value);
    this.currentCategoryFilterId = categoryId.value;
    this.handleFilter.emit(this.currentCategoryFilterId);
  }
}
