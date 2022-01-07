import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/core/models/user.model";

@Component({
    selector: "app-internal",
    templateUrl: "./internal.component.html",
    styleUrls: ["./internal.component.scss"]
})
export class InternalComponent implements OnInit {
    
    public user: User | undefined;

    constructor(
        private router: Router
    ) {
      
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
