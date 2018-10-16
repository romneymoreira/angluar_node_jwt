import {Component, forwardRef, Inject} from '@angular/core';
import {DataTable} from '../../';


@Component({
  selector: 'data-table-pagination',
  templateUrl: 'pagination.component.html',
  styleUrls: ['pagination.component.scss']
})
export class DataTablePagination<T> {

  constructor(@Inject(forwardRef(() => DataTable)) public dataTable: DataTable<T>) {
  }

  get maxPage() {
    return Math.ceil(this.dataTable.itemCount / this.dataTable.limit);
  }

  get limit() {
    return this.dataTable.limit;
  }

  set limit(value) {
    if (Number(value) > 0) {
      this.dataTable.limit = Math.floor(+value);
    }
  }

  get page() {
    return this.dataTable.page;
  }

  set page(value) {
    if (Number(value) > 0) {
      this.dataTable.page = Math.floor(+value);
    }
  }

  pageBack() {
    this.dataTable.offset -= Math.min(this.dataTable.limit, this.dataTable.offset);
  }

  pageForward() {
    this.dataTable.offset += this.dataTable.limit;
  }

  pageFirst() {
    this.dataTable.offset = 0;
  }

  pageLast() {
    this.dataTable.offset = (this.maxPage - 1) * this.dataTable.limit;
  }

  keyPress(event: any) {
    let inputChar = String.fromCharCode(event.charCode);
    if (!(Number(inputChar) >= 0)) {
      event.preventDefault();
    }
  }
}
