import { Component, Input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'ang23-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input()
  title: string = '';
}
