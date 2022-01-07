import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExternalRoutingModule } from './external-routing.module';
import { ExternalComponent } from './external.component';
import { InternalComponent } from '../internal/internal.component';


@NgModule({
  declarations: [
    ExternalComponent
  ],
  imports: [
    CommonModule,
    ExternalRoutingModule
  ]
})
export class ExternalModule { }
