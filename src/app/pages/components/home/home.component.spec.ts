import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [BrowserAnimationsModule, RouterTestingModule, SharedModule],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows links to the existing workspace pages', () => {
    const cards = fixture.nativeElement.querySelectorAll('.workspace-card');

    expect(cards.length).toBe(4);
    expect(fixture.nativeElement.textContent).toContain('Dynamic table');
    expect(fixture.nativeElement.textContent).toContain('Dashboard');
  });
});
