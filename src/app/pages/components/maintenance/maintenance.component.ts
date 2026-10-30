import { NgFor } from '@angular/common';
import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/service/data.service';
import {
  BaseMaintenanceComponent,
  PeriodicElement,
} from 'src/app/shared/base/base-maintenance/base-maintenance.component';

@Component({
  standalone: false,
  selector: 'ang23-maintenance',
  templateUrl:
    '../../../shared/base/base-maintenance/base-maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
  providers: [DataService],
})
export class MaintenanceComponent
  extends BaseMaintenanceComponent
  implements OnInit
{
  constructor(private readonly dataService: DataService) {
    super();
    this.service = dataService;
  }

  public override ngOnInit() {
    console.log('gyerek');
    super.ngOnInit();
  }
}
