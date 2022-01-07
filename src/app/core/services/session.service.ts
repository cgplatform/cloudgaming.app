import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

import { User } from "../models/user.model";

import { LocalStorageService } from "./local-storage.service";

import { Errors } from "../errors/default.error";

@Injectable({
    providedIn: "root"
})
export class SessionService {
    private user: User | undefined;

    constructor(
        private router: Router,
        private localStorageService: LocalStorageService
    ) {}

    public refresh(): void {
        const user = this.localStorageService.get("user");

        if (!user) {
            throw new Error(Errors.INVALID_SESSION);
        }
    }

    public get(): User {
        if (!this.user) {
            throw new Error(Errors.INVALID_SESSION);
        }

        return this.user;
    }

    public destroy(): void {
        this.localStorageService.remove("user");

        if (this.router.url.indexOf("/") == -1) {
            this.router.navigateByUrl("/");
            return;
        }

        window.location.reload();
    }
}
