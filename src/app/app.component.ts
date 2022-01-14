import { Component } from "@angular/core";

import gql from "graphql-tag";
import { UserQueryService } from "./core/services/user/query.services";
import { AlertComponent } from "./shared/components/alert/alert.component";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    title = "s2p-front";

    public alerts: Map<string, AlertComponent>= new Map();

    private alert: AlertComponent | undefined;

    constructor() {}

    public alertEvent(event: {instance: AlertComponent}){
        this.alert=event.instance;
    }


    public showMessage(message: string, type: string="success"){
        if(!this.alert){
            return;
        }
        this.alert.showMessage(message,type);
    }

}
