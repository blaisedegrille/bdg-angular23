import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { MaterialModule } from '../material.module';

import { CustomTableComponent } from './custom-table.component';

describe('CustomTableComponent', () => {
  let component: CustomTableComponent;
  let fixture: ComponentFixture<CustomTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomTableComponent],
      imports: [BrowserAnimationsModule, CommonModule, MaterialModule],
    });
    fixture = TestBed.createComponent(CustomTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updates its data source when input rows change', () => {
    component.tableData = [{ id: 1 }, { id: 2 }];

    expect(component.tableDataSource.data).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('emits the row when Edit is selected from its action menu', async () => {
    const row = { id: 1, name: 'Test User', email: 'test@example.com' };
    const editedRows: unknown[] = [];
    component.displayedColumns = { display: [], columns: ['action'] };
    component.tableData = [row];
    component.editRow.subscribe((value) => editedRows.push(value));
    fixture.detectChanges();

    const loader = TestbedHarnessEnvironment.loader(fixture);
    const menu = await loader.getHarness(
      MatMenuHarness.with({ triggerIconName: 'more_vert' })
    );
    await menu.open();
    await menu.clickItem({ text: /Edit/ });

    expect(editedRows).toEqual([row]);
  });

  it('emits the row when Delete is selected from its action menu', async () => {
    const row = { id: 2, name: 'Another User', email: 'other@example.com' };
    const deletedRows: unknown[] = [];
    component.displayedColumns = { display: [], columns: ['action'] };
    component.tableData = [row];
    component.deleteRow.subscribe((value) => deletedRows.push(value));
    fixture.detectChanges();

    const loader = TestbedHarnessEnvironment.loader(fixture);
    const menu = await loader.getHarness(
      MatMenuHarness.with({ triggerIconName: 'more_vert' })
    );
    await menu.open();
    await menu.clickItem({ text: /Delete/ });

    expect(deletedRows).toEqual([row]);
  });
});
