import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InputComponent } from "./input/input.component";
import { ButtonComponent } from "./button/button.component";
import { AlertComponent } from "./alert/alert.component";
import { CardsComponent } from "./cards/cards.component";

@NgModule({
    declarations: [
        AlertComponent,
        ButtonComponent,
        InputComponent,
        CardsComponent
    ],
    imports: [CommonModule],
    exports: [AlertComponent, ButtonComponent, InputComponent, CardsComponent]
})
export class ComponentsModule {}
