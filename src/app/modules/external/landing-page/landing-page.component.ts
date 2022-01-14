import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from "@angular/router";
import { UserQueryService } from "src/app/core/services/user/query.services";
import { ApiErrors } from 'src/app/core/errors/api-errors.error';
import { SessionService } from 'src/app/core/services/session.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: "app-landing-page",
    templateUrl: "./landing-page.component.html",
    styleUrls: ["./landing-page.component.scss"]
})
export class LandingPageComponent implements OnInit {
   

    constructor(
        private appComponent: AppComponent,
    ) {
        
    }

    ngOnInit(): void {

        
    }

    
}
