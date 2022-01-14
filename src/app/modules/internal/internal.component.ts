import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/core/models/user.model";
import { SessionService } from "src/app/core/services/session.service";

@Component({
    templateUrl: "./internal.component.html",
    styleUrls: ["../../../assets/scss/layout.scss", "./internal.component.scss"]
})
export class InternalComponent implements OnInit {
    public user: User | undefined;

    constructor(
        private router: Router,
        private _sessionService: SessionService
    ) {
        try {
            this._sessionService.refresh();
            this.user = this._sessionService.get();
        } catch (e) {}
    }

    ngOnInit(): void {}

    public profileAction() {
        if (this.user) {
            this.router.navigate(["/profile"]);
        } else {
            this.router.navigate(["/login"]);
        }
    }

    public home() {
        this.router.navigate([""]);
    }
}
