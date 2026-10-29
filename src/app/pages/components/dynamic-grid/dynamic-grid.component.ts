import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { catchError, finalize } from 'rxjs';
import { DisplayedColumns } from 'src/app/models/displayed-columns';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { BaseEditFormComponent } from 'src/app/shared/base/base-edit-form/base-edit-form.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

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
  public allUsers: User[] = [];
  public searchTerm = '';
  public pageEvent!: PageEvent;
  public sortState: Sort = {
    direction: '',
    active: '',
  };

  constructor(
    private readonly userService: UserService,
    private readonly dialog: MatDialog
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
        this.allUsers = users;
        this.filterUsers();
      });
  }

  filterUsers(searchTerm = this.searchTerm): void {
    this.searchTerm = searchTerm;
    const query = this.searchTerm.trim().toLocaleLowerCase();

    this.tableData = query
      ? this.allUsers.filter((user) =>
          [user.id.toString(), user.name, user.email].some((value) =>
            value.toLocaleLowerCase().includes(query)
          )
        )
      : [...this.allUsers];

    this.paginationLength = this.tableData.length;
    this.pageIndex = 0;
  }

  handlePageEvent(event: PageEvent) {
    this.pageEvent = event;
    this.pageIndex = event.pageIndex;
    this.defaultPageSize = event.pageSize;
  }

  handleSortEvent(event: Sort) {
    this.sortState = event;
  }

  editUser(user: User): void {
    this.dialog
      .open(BaseEditFormComponent, {
        data: user,
        width: '480px',
        maxWidth: 'calc(100vw - 32px)',
      })
      .afterClosed()
      .subscribe((updatedUser: User | undefined) => {
        if (!updatedUser) {
          return;
        }

        this.allUsers = this.allUsers.map((currentUser) =>
          currentUser.id === user.id ? updatedUser : currentUser
        );
        this.filterUsers();
      });
  }

  deleteUser(user: User): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: user,
        width: '400px',
        maxWidth: 'calc(100vw - 32px)',
      })
      .afterClosed()
      .subscribe((confirmed: boolean | undefined) => {
        if (!confirmed) {
          return;
        }

        this.allUsers = this.allUsers.filter(
          (currentUser) => currentUser.id !== user.id
        );
        this.filterUsers();
      });
  }
}
