import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmailConfirmationComponent } from "./email-confirmation/email-confirmation.component";
import { RegisterConfirmationComponent } from "./register-confirmation/register-confirmation.component";
import { RegisterDataComponent } from "./register-data/register-data.component";

const routes: Routes = [
    { path: "", component: RegisterDataComponent },
    { path: "sucess", component: RegisterConfirmationComponent },
    { path: "verify/:token", component: EmailConfirmationComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegisterRoutingModule {}
