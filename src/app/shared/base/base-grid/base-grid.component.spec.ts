import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { BaseGridComponent } from './base-grid.component';

describe('BaseGridComponent', () => {
  let component: BaseGridComponent<unknown>;
  let fixture: ComponentFixture<BaseGridComponent<unknown>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseGridComponent],
      providers: [{ provide: MatDialog, useValue: {} }],
    });
    fixture = TestBed.createComponent(BaseGridComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
