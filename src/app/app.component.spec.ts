import { BreakpointObserver } from '@angular/cdk/layout';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SharedModule } from './shared/shared.module';
import { ModeToggleModule } from './shared/mode-toggle/mode-toggle.module';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ModeToggleModule,
        RouterTestingModule,
        SharedModule,
      ],
      declarations: [AppComponent],
      providers: [
        {
          provide: BreakpointObserver,
          useValue: { observe: () => of({ matches: false }) },
        },
      ],
    });
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('shows the branded toolbar and workspace navigation', () => {
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('.brand-title')?.textContent).toContain('BDG Angular');
    expect(host.querySelectorAll('.app-nav-list a').length).toBe(8);
  });
});
