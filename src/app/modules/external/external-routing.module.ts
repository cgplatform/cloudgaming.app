import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ExternalComponent } from "./external.component";

const routes: Routes = [
    {
        path: "register",
        loadChildren: () =>
            import("./register/register.module").then((m) => m.RegisterModule),
        component: ExternalComponent
    },
    {
        path: "login",
        loadChildren: () =>
            import("./login/login.module").then((m) => m.LoginModule),
        component: ExternalComponent
    },
    {
        path: "recovery-email",
        loadChildren: () =>
            import("./recovery-email/recovery-email.module").then(
                (m) => m.RecoveryEmailModule
            ),
        component: ExternalComponent
    },
    {
        path: "recovery-confirmation",
        loadChildren: () =>
            import("./recovery-confirmation/recovery-confirmation.module").then(
                (m) => m.RecoveryConfirmationModule
            ),
        component: ExternalComponent
    },
    {
        path: "recovery-new-password",
        loadChildren: () =>
            import("./recovery-new-password/recovery-new-password.module").then(
                (m) => m.RecoveryNewPasswordModule
            ),
        component: ExternalComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExternalRoutingModule {}
