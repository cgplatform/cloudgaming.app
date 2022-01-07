import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InternalComponent } from "../internal/internal.component";
import { ExternalComponent } from "./external.component";

const routes: Routes = [
    {
        path: "",
        loadChildren: () =>
            import("./landing-page/landing-page.module").then((m) => m.LandingPageModule),
        component: InternalComponent
    },
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
