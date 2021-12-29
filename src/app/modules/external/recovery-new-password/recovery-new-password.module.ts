import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RecoveryNewPasswordRoutingModule } from "./recovery-new-password-routing.module";
import { RecoveryNewPasswordComponent } from "./recovery-new-password.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "src/app/shared/components/components.module";

@NgModule({
    declarations: [RecoveryNewPasswordComponent],
    imports: [
        CommonModule,
        RecoveryNewPasswordRoutingModule,
        ReactiveFormsModule,
        ComponentsModule
    ]
})
export class RecoveryNewPasswordModule {}
