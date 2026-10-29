import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  MatPaginator,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DisplayedColumns } from 'src/app/models/displayed-columns';

@Component({
  standalone: false,
  selector: 'ang23-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
})
export class CustomTableComponent implements AfterViewInit {
  public tableDataSource = new MatTableDataSource<any>([]);

  @Input()
  public displayedColumns: DisplayedColumns = { display: [], columns: [] };

  @ViewChild(MatPaginator, { static: false }) matPaginator!: MatPaginator;

  @ViewChild(MatSort) matSort!: MatSort;

  @Input() set tableData(data: any[] | null | undefined) {
    this.tableDataSource.data = data ?? [];
  }
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[1];
  @Input() paginationLength: number = 0;
  @Input()
  public loading: boolean = false;

  @Input()
  pageIndex = 0;

  public allowMultiSelect = true;
  public initialSelection = [];
  public selection: SelectionModel<any> = new SelectionModel<any>(
    this.allowMultiSelect,
    this.initialSelection
  );
  @Output() sortEvent: EventEmitter<Sort> = new EventEmitter();
  @Output() pageEvent: EventEmitter<PageEvent> = new EventEmitter();
  @Output() editRow = new EventEmitter<any>();
  @Output() deleteRow = new EventEmitter<any>();

  public clickedRows = new Set<any>();

  constructor() {}

  ngAfterViewInit(): void {
    this.tableDataSource.sort = this.matSort;
    this.tableDataSource.paginator = this.matPaginator;
  }

  handlePageEvent(event: PageEvent) {
    console.log('page event: ', event);
    this.pageEvent.emit(event);
    this.paginationLength = event.length;
    this.defaultPageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
  announceSortChange(sortParameters: Sort) {
    this.sortEvent.emit(sortParameters);
  }

  /*   sortTable(sortParameters: Sort) {
    // defining name of data property, to sort by, instead of column name
    sortParameters.active = this.displayedColumns?.display?.find(
      (column) => column.name === sortParameters.active
    ).dataKey;
    this.sortEvent.emit(sortParameters);
  } */

  onSelectionChange(element: any) {
    console.log('onSelectionChange() ', element);
    console.log('selected? ', this.selection.isSelected(element));
    if (this.selection.isSelected(element)) {
      this.selection.deselect(element);
    } else {
      this.selection.select(element);
    }
    console.log('', this.selection.selected);
  }

  onRowChange(element: any) {
    console.log('onRowChange');
    this.onSelectionChange(element);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableDataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.tableDataSource.data.forEach((row) => this.selection.select(row));
    console.log('toggleAllRows() ', this.selection);
  }
}
