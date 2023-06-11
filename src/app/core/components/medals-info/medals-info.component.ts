import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-medals-info',
  templateUrl: './medals-info.component.html',
  styleUrls: ['./medals-info.component.scss']
})
export class MedalsInfoComponent {
  @Input() name!: string;
  @Input() info!: string;
}
