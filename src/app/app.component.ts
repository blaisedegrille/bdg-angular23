import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';
import { Menu } from './models/menu';

@Component({
  standalone: false,
  selector: 'ang23-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'BDG Angular';
  drawerMode: MatDrawerMode = 'side';
  isMobileViewport = false;
  componentList: Menu[] = [
    { name: 'Home', route: 'home', icon: 'home' },
    { name: 'Dynamic table', route: 'dynamic-grid', icon: 'table_chart' },
    { name: 'Dashboard', route: 'dashboard', icon: 'space_dashboard' },
    { name: 'Editor', route: 'editor', icon: 'edit_note' },
    { name: 'Maintenance', route: 'maintenance', icon: 'build' },
    { name: 'Data table', route: 'datatable', icon: 'table_rows' },
    { name: 'Users', route: 'user', icon: 'group' },
    { name: 'Settings', route: 'settings', icon: 'settings' },
  ];

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe('(max-width: 760px)')
      .subscribe(({ matches }) => {
        this.isMobileViewport = matches;
        this.drawerMode = matches ? 'over' : 'side';
      });
  }

  closeDrawerOnMobile(drawer: MatDrawer): void {
    if (this.isMobileViewport) {
      drawer.close();
    }
  }
}
