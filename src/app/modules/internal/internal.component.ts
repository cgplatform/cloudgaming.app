import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/core/models/user.model";
import { SessionService } from "src/app/core/services/session.service";

@Component({
    selector: "app-internal",
    templateUrl: "./internal.component.html",
    styleUrls: ["./internal.component.scss"]
})
export class InternalComponent implements OnInit {
    
    public user: User;

    constructor(
        private router: Router,
        private _sessionService: SessionService
    ) {
      this.user = this._sessionService.get();
    }

    ngOnInit(): void {

    }

    public profileAction(){
        if(this.user){
            this.router.navigate(["/profile"]);
        }else{
            this.router.navigate(["/login"]);
        }
    }

    public home(){
        this.router.navigate([""]);
    }
}
