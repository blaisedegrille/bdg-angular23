import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BaseMaintenanceComponent } from './base/base-maintenance/base-maintenance.component';
import { BaseGridComponent } from './base/base-grid/base-grid.component';
import { BaseEditFormComponent } from './base/base-edit-form/base-edit-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './base/dynamic-form/dynamic-form.component';
import { DynamicFormFieldComponent } from './base/dynamic-form/dynamic-form-field/dynamic-form-field.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgxEditorModule } from 'ngx-editor';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CustomTableComponent } from './custom-table/custom-table.component';

@NgModule({
  declarations: [
    BaseMaintenanceComponent,
    BaseGridComponent,
    BaseEditFormComponent,
    DynamicFormComponent,
    DynamicFormFieldComponent,
    ConfirmDialogComponent,
    NotFoundComponent,
    CustomTableComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    NgScrollbarModule,
  ],

  exports: [
    MaterialModule,
    NgxDatatableModule,
    BaseMaintenanceComponent,
    BaseEditFormComponent,
    NgxEditorModule,
    NgScrollbarModule,
    CustomTableComponent,
  ],
})
export class SharedModule {}
