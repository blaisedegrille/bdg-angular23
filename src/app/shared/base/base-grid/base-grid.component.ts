import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BaseEditFormComponent } from '../base-edit-form/base-edit-form.component';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';

import { DisplayedColumns } from 'src/app/models/displayed-columns';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  standalone: false,
  selector: 'ang23-base-grid',
  templateUrl: './base-grid.component.html',
  styleUrls: ['./base-grid.component.scss'],
})
export class BaseGridComponent<T> {
  showCdkTable = false;
  protected displayedColumns: DisplayedColumns | undefined;
  protected dataSource = new MatTableDataSource<T>();
  protected service: any;

  public searchValue = '';
  public clickedRows = new Set<T>();
  public selection: SelectionModel<T> = new SelectionModel<T>();
  public initialSelection = [];
  public allowMultiSelect = false;

  // paginator
  public length!: number;
  public pageSize = 10;
  public pageIndex = 0;
  public pageEvent!: PageEvent;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public collection: T[] = [];

  constructor(
    public dialog: MatDialog /* public _liveAnnouncer: LiveAnnouncer */
  ) {}

  ngOnInit(): void {
    console.log('szülő');
    // this.reloadFromService();
    this.loadDefaults();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.selection = new SelectionModel<T>(
      this.allowMultiSelect,
      this.initialSelection
    );
  }

  reloadFromService() {
    this.service.get().subscribe((res: any) => {
      this.collection = res;
      this.length = this.collection.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      //this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.data = this.collection;
    });
  }

  loadDefaults() {
    this.service.getDefaultData().subscribe((res: any) => {
      this.collection = res;
      this.length = this.collection.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      //this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.data = this.collection;
    });
  }

  announceSortChange(sortState: Sort) {
    console.log('sortState: ', sortState);
  }

  searchInputChange(event: any) {
    if (this.searchValue.length > 1) {
      let searchResult: T[] = [];
      this.collection.forEach((e: any) => {
        for (let key in e) {
          if (typeof e[key] === 'string') {
            if (e[key].toLowerCase().includes(this.searchValue.toLowerCase())) {
              searchResult.push(e);
            }
          }
        }
      });
      this.dataSource.data = searchResult;
    } else {
      this.dataSource.data = this.collection;
    }
  }

  openDialog(element: any): void {
    const dialogRef = this.dialog.open(BaseEditFormComponent, {
      data: element[0],
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.selection.clear();
    });
  }

  removeHandler(element: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: element[0],
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.selection.clear();
    });
  }

  onSelectionChange(element: T) {
    console.log('onSelectionChange() ', element);
    console.log('selected? ', this.selection.isSelected(element));
    if (this.selection.isSelected(element)) {
      this.selection.deselect(element);
    } else {
      this.selection.select(element);
    }

    console.log('', this.selection.selected);
  }

  onRowChange(element: T) {
    console.log('onRowChange');
    this.onSelectionChange(element);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
    console.log('toggleAllRows() ', this.selection);
  }

  /** Announce the change in sort state for assistive technology. */
  sortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    /*     if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    } */
  }
}
