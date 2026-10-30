import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

import { DynamicGridComponent } from './dynamic-grid.component';

describe('DynamicGridComponent', () => {
  let component: DynamicGridComponent;
  let fixture: ComponentFixture<DynamicGridComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let dialog: jasmine.SpyObj<MatDialog>;
  const apiUsers: User[] = [
    { id: 1, name: 'API User', email: 'api@example.com' },
    { id: 2, name: 'Other User', email: 'other@example.com' },
  ];
  const sampleUsers: User[] = [
    { id: 2, name: 'Sample User', email: 'sample@example.com' },
  ];

  beforeEach(() => {
    userService = jasmine.createSpyObj<UserService>('UserService', [
      'get',
      'getDefaultData',
    ]);
    userService.get.and.returnValue(of(apiUsers));
    userService.getDefaultData.and.returnValue(of(sampleUsers));
    dialog = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);
    dialog.open.and.returnValue({ afterClosed: () => of(undefined) } as any);

    TestBed.configureTestingModule({
      declarations: [DynamicGridComponent],
      imports: [BrowserAnimationsModule, SharedModule],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: MatDialog, useValue: dialog },
      ],
    });
    fixture = TestBed.createComponent(DynamicGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads rows from the user API', () => {
    expect(userService.get).toHaveBeenCalled();
    expect(component.tableData).toEqual(apiUsers);
    expect(component.paginationLength).toBe(apiUsers.length);
    expect(component.loading).toBeFalse();
    expect(fixture.nativeElement.textContent).toContain('API User');
  });

  it('uses sample rows when the user API is unavailable', () => {
    userService.get.and.returnValue(throwError(() => new Error('API offline')));

    component.getTableData();

    expect(userService.getDefaultData).toHaveBeenCalled();
    expect(component.tableData).toEqual(sampleUsers);
    expect(component.paginationLength).toBe(sampleUsers.length);
    expect(component.loading).toBeFalse();
  });

  it('filters by ID, name, and email, and restores rows when cleared', () => {
    const searchInput: HTMLInputElement =
      fixture.nativeElement.querySelector('input[type="search"]');
    searchInput.value = 'OTHER@EXAMPLE.COM';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.tableData).toEqual([apiUsers[1]]);
    expect(component.paginationLength).toBe(1);

    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.tableData).toEqual(apiUsers);
    expect(component.paginationLength).toBe(apiUsers.length);
  });

  it('applies edit results to the local table data', () => {
    const updatedUser = { ...apiUsers[0], name: 'Updated API User' };
    dialog.open.and.returnValue({ afterClosed: () => of(updatedUser) } as any);

    component.editUser(apiUsers[0]);

    expect(component.allUsers[0]).toEqual(updatedUser);
    expect(component.tableData[0]).toEqual(updatedUser);
  });

  it('removes a confirmed user from the local table data', () => {
    dialog.open.and.returnValue({ afterClosed: () => of(true) } as any);

    component.deleteUser(apiUsers[0]);

    expect(component.allUsers).toEqual([apiUsers[1]]);
    expect(component.tableData).toEqual([apiUsers[1]]);
    expect(component.paginationLength).toBe(1);
  });
});
