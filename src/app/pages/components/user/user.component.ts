import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { User } from 'src/app/models/user';
import { UserJsonPlaceholder } from 'src/app/models/user-jsonplaceholder';
import { UserJsonPlaceholderService } from 'src/app/service/user-jsonplaceholder.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  standalone: false,
  selector: 'ang23-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public displayedColumns: string[] = ['id', 'title', 'body', 'userId'];
  public length!: number;
  public pageSize = 10;
  public pageIndex = 0;
  pageEvent!: PageEvent;

  public dataSource = new MatTableDataSource<UserJsonPlaceholder>();
  public users: UserJsonPlaceholder[] = [];

  constructor(private readonly userService: UserJsonPlaceholderService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((res: UserJsonPlaceholder[]) => {
      this.users = res;
      this.length = this.users.length;
      this.dataSource.paginator = this.paginator;
      //this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.data = this.users;
    });
  }

  ngAfterViewInit() {
    console.log('ok');
    this.dataSource.paginator = this.paginator;
  }
}
