import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternalRoutingModule } from './internal-routing.module';
import { InternalComponent } from './internal.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';


@NgModule({
  declarations: [
    InternalComponent
  ],
  imports: [
    CommonModule,
    InternalRoutingModule,
    ComponentsModule
  ]
})
export class InternalModule { }
