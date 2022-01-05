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
        path: "recovery",
        loadChildren: () =>
            import("./recovery/recovery.module").then((m) => m.RecoveryModule),
        component: ExternalComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExternalRoutingModule {}
