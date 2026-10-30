import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { SharedModule } from '../../shared.module';

import { BaseEditFormComponent } from './base-edit-form.component';

describe('BaseEditFormComponent', () => {
  let component: BaseEditFormComponent;
  let fixture: ComponentFixture<BaseEditFormComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<BaseEditFormComponent>>;
  const user: User = { id: 5, name: 'Original User', email: 'user@example.com' };

  beforeEach(() => {
    dialogRef = jasmine.createSpyObj<MatDialogRef<BaseEditFormComponent>>(
      'MatDialogRef',
      ['close']
    );
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, SharedModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: user },
      ],
    });
    fixture = TestBed.createComponent(BaseEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('returns edited user values from the form', () => {
    const nameInput: HTMLInputElement = fixture.nativeElement.querySelector(
      'input'
    );
    nameInput.value = 'Updated User';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const saveButton = Array.from(
      fixture.nativeElement.querySelectorAll(
        'button'
      ) as NodeListOf<HTMLButtonElement>
    ).find((button) => button.textContent?.includes('Save'))!;
    saveButton.click();

    expect(dialogRef.close).toHaveBeenCalledWith({
      ...user,
      name: 'Updated User',
    });
  });
});
