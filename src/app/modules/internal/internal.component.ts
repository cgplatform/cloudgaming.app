import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-internal",
    templateUrl: "./internal.component.html",
    styleUrls: ["./internal.component.scss"]
})
export class InternalComponent implements OnInit {
    public arrayCards: string[] = [
        "../../../../assets/images/cards/mk.png",
        "../../../../assets/images/cards/mk.png",
        "../../../../assets/images/cards/mk.png"
    ];

    constructor() {}

    ngOnInit(): void {}
}
