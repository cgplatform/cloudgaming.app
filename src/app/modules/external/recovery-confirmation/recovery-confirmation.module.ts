import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RecoveryConfirmationRoutingModule } from "./recovery-confirmation-routing.module";
import { RecoveryConfirmationComponent } from "./recovery-confirmation.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "src/app/shared/components/components.module";

@NgModule({
    declarations: [RecoveryConfirmationComponent],
    imports: [
        CommonModule,
        RecoveryConfirmationRoutingModule,
        ReactiveFormsModule,
        ComponentsModule
    ]
})
export class RecoveryConfirmationModule {}
