import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RecoveryEmailRoutingModule } from "./recovery-email-routing.module";
import { RecoveryEmailComponent } from "./recovery-email.component";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [RecoveryEmailComponent],
    imports: [
        CommonModule,
        RecoveryEmailRoutingModule,
        ReactiveFormsModule,
        ComponentsModule
    ]
})
export class RecoveryEmailModule {}
