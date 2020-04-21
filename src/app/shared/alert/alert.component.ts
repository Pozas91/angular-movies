import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() message: string;
  @Input() type: string;
  @Input() timer?: number = null;
  @Output() close = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
    if (this.timer) {
      setTimeout(() => this.onClose(), this.timer);
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
