import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { catchError, finalize } from 'rxjs';
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
  public paginationLength = 0;
  public pageIndex: number = 0;
  public loading = false;
  public tableData: User[] = [];
  public pageEvent!: PageEvent;
  public sortState: Sort = {
    direction: '',
    active: '',
  };

  constructor(
    private readonly userService: UserService
  ) {}

  public ngOnInit() {
    this.getTableData();
  }

  getTableData(): void {
    this.loading = true;

    this.userService
      .get()
      .pipe(
        catchError(() => this.userService.getDefaultData()),
        finalize(() => (this.loading = false))
      )
      .subscribe((users) => {
        this.tableData = users;
        this.paginationLength = users.length;
      });
  }

  handlePageEvent(event: PageEvent) {
    this.pageEvent = event;
    this.pageIndex = event.pageIndex;
    this.defaultPageSize = event.pageSize;
  }

  handleSortEvent(event: Sort) {
    this.sortState = event;
  }
}
