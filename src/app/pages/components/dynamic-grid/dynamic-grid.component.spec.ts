import { ComponentFixture, TestBed } from '@angular/core/testing';
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
  const apiUsers: User[] = [{ id: 1, name: 'API User', email: 'api@example.com' }];
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

    TestBed.configureTestingModule({
      declarations: [DynamicGridComponent],
      imports: [BrowserAnimationsModule, SharedModule],
      providers: [{ provide: UserService, useValue: userService }],
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
});
