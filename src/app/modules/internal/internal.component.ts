import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-internal",
    templateUrl: "./internal.component.html",
    styleUrls: ["./internal.component.scss"]
})
export class InternalComponent implements OnInit {
    public arrayCards: { path: string; name: string }[] = [
        {
            path: "../../../../assets/images/cards/land.png",
            name: "Mortal Kombat 11"
        },
        {
            path: "../../../../assets/images/cards/mk.png",
            name: "Mortal Kombat 11"
        }
    ];

    public loading: boolean = true;

    constructor() {}

    ngOnInit(): void {}

    clickIcone(content: any) {
        console.log(content);
        console.log("capturei o click");
    }

    clickText(content: any) {
        console.log(content);
        console.log("capturei o click");
    }
}
