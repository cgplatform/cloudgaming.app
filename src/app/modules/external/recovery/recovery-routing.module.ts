import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecoveryConfirmationComponent } from "./recovery-confirmation/recovery-confirmation.component";
import { RecoveryEmailComponent } from "./recovery-email/recovery-email.component";
import { RecoveryNewPasswordComponent } from "./recovery-new-password/recovery-new-password.component";

const routes: Routes = [
    { path: "email", component: RecoveryEmailComponent },
    { path: "confirmation", component: RecoveryConfirmationComponent },
    { path: ":token", component: RecoveryNewPasswordComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecoveryRoutingModule {}
