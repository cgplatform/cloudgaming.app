import { NgModule } from "@angular/core";
import { ButtonComponent } from './button/button.component';
import { AlertComponent } from './alert/alert.component';


@NgModule({
    declarations: [
       
    ButtonComponent,
    AlertComponent
  ],
    imports: [
       
    ],
    exports: [
       ButtonComponent,
       AlertComponent
    ]
})
export class ComponentsModule {}
