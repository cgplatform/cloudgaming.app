import { Component } from "@angular/core";

import gql from "graphql-tag";
import { UserQueryService } from "./core/services/user/query.services";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    title = "s2p-front";

    constructor() {}
}
