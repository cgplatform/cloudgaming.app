import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-recovery-confirmation",
    templateUrl: "./recovery-confirmation.component.html",
    styleUrls: ["./recovery-confirmation.component.scss"]
})
export class RecoveryConfirmationComponent implements OnInit {
    public close: boolean = false;

    constructor(private router: Router) {}

    ngOnInit(): void {}

    public confirmation() {
        this.router.navigate(["/"]);
    }
}
