import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { NgxMaskModule } from "ngx-mask";

import { InputComponent } from "./input/input.component";
import { ButtonComponent } from "./button/button.component";
import { AlertComponent } from "./alert/alert.component";
import { CardsComponent } from "./cards/cards.component";
import { ModalComponent } from "./modal/modal.component";

@NgModule({
    declarations: [
        AlertComponent,
        ButtonComponent,
        InputComponent,
        CardsComponent,
        ModalComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot({
            validation: false
        })
    ],
    exports: [AlertComponent, ButtonComponent, InputComponent, CardsComponent, ModalComponent]
})
export class ComponentsModule {}
