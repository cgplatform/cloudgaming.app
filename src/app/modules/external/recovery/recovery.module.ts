import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RecoveryRoutingModule } from "./recovery-routing.module";
import { RecoveryEmailComponent } from "./recovery-email/recovery-email.component";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { ReactiveFormsModule } from "@angular/forms";
import { RecoveryConfirmationComponent } from "./recovery-confirmation/recovery-confirmation.component";
import { RecoveryNewPasswordComponent } from "./recovery-new-password/recovery-new-password.component";

@NgModule({
    declarations: [
        RecoveryEmailComponent,
        RecoveryConfirmationComponent,
        RecoveryNewPasswordComponent
    ],
    imports: [
        CommonModule,
        RecoveryRoutingModule,
        ReactiveFormsModule,
        ComponentsModule
    ]
})
export class RecoveryModule {}
