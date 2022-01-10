import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegisterConfirmationComponent } from "./register-confirmation/register-confirmation.component";
import { RegisterDataComponent } from "./register-data/register-data.component";

const routes: Routes = [
    { path: "", component: RegisterDataComponent },
    { path: "sucess", component: RegisterConfirmationComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegisterRoutingModule {}
