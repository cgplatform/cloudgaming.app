import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';


@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    LandingPageRoutingModule
  ]
})
export class LandingPageModule { }
