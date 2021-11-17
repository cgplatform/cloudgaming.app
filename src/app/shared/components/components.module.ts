import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AlertComponent,
    ButtonComponent,
    InputComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    ButtonComponent,
    InputComponent
  ]
})
export class ComponentsModule { }
