import { Component } from '@angular/core';

interface WorkspaceLink {
  route: string;
  icon: string;
  label: string;
  title: string;
  description: string;
}

@Component({
  standalone: false,
  selector: 'ang23-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  readonly workspaceLinks: WorkspaceLink[] = [
    {
      route: '/dynamic-grid',
      icon: 'table_chart',
      label: 'DATA',
      title: 'Dynamic table',
      description: 'Search, sort, and explore the user table.',
    },
    {
      route: '/dashboard',
      icon: 'space_dashboard',
      label: 'INSIGHTS',
      title: 'Dashboard',
      description: 'Explore charts and data visualizations.',
    },
    {
      route: '/editor',
      icon: 'edit_note',
      label: 'CREATE',
      title: 'Editor',
      description: 'Start a new rich-text editing session.',
    },
    {
      route: '/user',
      icon: 'group',
      label: 'PEOPLE',
      title: 'Users',
      description: 'Browse the user directory.',
    },
  ];
}
