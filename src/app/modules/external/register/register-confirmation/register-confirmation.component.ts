import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-register-confirmation",
    templateUrl: "./register-confirmation.component.html",
    styleUrls: ["./register-confirmation.component.scss"]
})
export class RegisterConfirmationComponent implements OnInit {
    public close: boolean = false;

    constructor(private router: Router) {}

    ngOnInit(): void {}

    public confirmation() {
        //TODO alterar rota
        this.router.navigate(["/profile"]);
    }
}
