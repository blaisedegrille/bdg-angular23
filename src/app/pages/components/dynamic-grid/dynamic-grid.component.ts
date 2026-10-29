import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { DisplayedColumns } from 'src/app/models/displayed-columns';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  standalone: false,
  selector: 'ang23-dynamic-grid',
  templateUrl: './dynamic-grid.component.html',
  styleUrls: ['./dynamic-grid.component.scss'],
})
export class DynamicGridComponent implements OnInit {
  public cols: DisplayedColumns = {
    display: [
      {
        name: 'id',
        header: 'Id',
        type: 'number',
      },
      {
        name: 'name',
        header: 'Name',
        type: 'string',
      },
      {
        name: 'email',
        header: 'Email',
        type: 'string',
      },
    ],
    columns: ['select', 'id', 'name', 'email', 'action'],
  };
  public paginationSizes: number[] = [5, 10, 15];
  public defaultPageSize = this.paginationSizes[1];
  public paginationLength: number = 0;
  public pageIndex: number = 0;
  public loading = false;
  public tableData!: User[];
  public pageEvent!: PageEvent;
  public sortState: Sort = {
    direction: '',
    active: '',
  };

  constructor(
    private readonly userService: UserService,
    public dialog: MatDialog
  ) {}

  public ngOnInit() {
    console.log('DynamicGridComponent');
    this.getTableData();
    //this.initFilters();
    //this.handleFilterEvent();
  }
  /*   initFilters() {
    this.initFilterDropDowns();
    this.initFilterForm();
  } */

  getTableData() {}

  handlePageEvent(event: PageEvent) {
    this.loading = true;
    console.log('EVAT LIST COMP: ', event);
    this.pageEvent = event;
    this.pageIndex = event.pageIndex;
    this.defaultPageSize = event.pageSize;
    this.getTableData();
  }

  handleSortEvent(event: Sort) {
    this.loading = true;
    this.sortState = event;
    console.log('EvatListComponent sortEvent: ', event);
    this.getTableData();
  }
}
