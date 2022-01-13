import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/core/models/user.model';
import { ActivatedRoute } from "@angular/router";
import { UserQueryService } from "src/app/core/services/user/query.services";

@Component({
    selector: "app-landing-page",
    templateUrl: "./landing-page.component.html",
    styleUrls: ["./landing-page.component.scss"]
})
export class LandingPageComponent implements OnInit {
    private params: any;

    constructor(
        private userQueryService: UserQueryService,
        private activadedRoute: ActivatedRoute,
        private appComponent: AppComponent
    ) {}

    ngOnInit(): void {

        this.activadedRoute.params.subscribe((params: any) => {
            this.params = params;
            this.verifyAccount();
        });
    }

    private verifyAccount() {
        if (!this.params.token) {
            return;
        }

        this.userQueryService
            .confirmEmail(this.params.token)
            .subscribe((response: any) => {
                if (response.errors) {
                    return;
                }
            });
    }
}
