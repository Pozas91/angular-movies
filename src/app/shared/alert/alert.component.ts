import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: []
})
export class AlertComponent {
  @Input() message: string;
}
