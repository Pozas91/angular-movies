import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {AlertComponent} from './alert/alert.component';


const COMPONENTS = [
  LoadingSpinnerComponent,
  AlertComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule
  ],
  exports: COMPONENTS
})
export class SharedModule {
}
