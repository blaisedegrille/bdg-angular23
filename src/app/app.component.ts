import { Component, OnInit } from '@angular/core';
import { Menu } from './models/menu';
import { Mode } from './shared/mode-toggle/mode-toggle.model';
import { ModeToggleService } from './shared/mode-toggle/mode-toggle.service';

@Component({
  standalone: false,
  selector: 'ang23-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  darkmode = true;
  title = 'bdq-ang23';
  showFiller = false;
  componentList: Menu[] = [
    { name: 'Home', route: 'home' },
    { name: 'Dynamic Table', route: 'dynamic-grid' },
    { name: 'Dashboard', route: 'dashboard' },
    { name: 'Editor', route: 'editor' },
    { name: 'Something', route: 'something' },
    /*     { name: 'Maintenance', route: 'maintenance' },
    { name: 'DataTable', route: 'datatable' },
    { name: 'User', route: 'user' },
    { name: 'Settings', route: 'settings' }, */
  ];

  // currentMode: Mode = Mode.LIGHT;
  constructor(private modeToggleService: ModeToggleService) {
    /**
     * Example code that demonstrate the modeChanged$ observable behavior and usage
     */
    /*     this.modeToggleService.modeChanged$.subscribe((mode: Mode) => {
      this.currentMode = mode;
    }); */
  }

  ngOnInit(): void {}

  openGithubRepo() {
    const url = 'https://github.com/blaisedegrille/angular-2023';
    window.open(url, '_blank');
  }
}
