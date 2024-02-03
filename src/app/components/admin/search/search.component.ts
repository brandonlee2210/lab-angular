import {
  Component,
  EventEmitter,
  Output,
  inject,
  OnInit,
  Input,
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  @Output() handleSearch = new EventEmitter<any>();

  searchForm = new FormGroup({
    search: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor() {}

  onSearchSubmit() {
    this.handleSearch.emit(this.searchForm.value);
  }
}
