import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnInit {
  @Output() handleNextPage = new EventEmitter<any>();
  @Output() handlePrevPage = new EventEmitter<any>();
  @Output() handleClicks = new EventEmitter<any>();
  @Input() totalPages: number = 0;
  @Input() currentPage: number = 0;
  objectTotalPages: any = [];

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty('totalPages')) {
        const change = changes['totalPages'];
        const currentValue = change.currentValue;
        const previousValue = change.previousValue;

        this.getArrayFromNumber(currentValue);
      }
    }
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }

  getArrayFromNumber(totalPages: number) {
    let newArr = [];
    for (let i = 0; i < totalPages; i++) {
      newArr.push(i + 1);
    }

    this.objectTotalPages = newArr;
  }

  handleNext() {
    this.handleNextPage.emit();
  }

  handlePage(i: number) {
    this.handleClicks.emit(i);
  }

  handlePrev() {
    this.handlePrevPage.emit();
  }
}
