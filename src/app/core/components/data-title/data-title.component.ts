import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-title',
  templateUrl: './data-title.component.html',
  styleUrls: ['./data-title.component.scss']
})
export class DataTitleComponent {
  @Input() title!: string;
}
