import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  alert = {
    show: true,
    type: 'info',
    message: 'adadasd',
    time: 1000
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
