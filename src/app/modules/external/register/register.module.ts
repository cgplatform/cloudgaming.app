import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RegisterRoutingModule } from "./register-routing.module";
import { RegisterDataComponent } from "./register-data/register-data.component";
import { RegisterConfirmationComponent } from "./register-confirmation/register-confirmation.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "src/app/shared/components/components.module";

@NgModule({
    declarations: [RegisterDataComponent, RegisterConfirmationComponent],
    imports: [
        CommonModule,
        RegisterRoutingModule,
        ReactiveFormsModule,
        ComponentsModule
    ]
})
export class RegisterModule {}
