import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "./landing-page.component";

const routes: Routes = [
    { path: "", component: LandingPageComponent },
    { path: "/verify/:id", component: LandingPageComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LandingPageRoutingModule {}
