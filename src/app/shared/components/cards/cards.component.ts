import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-cards",
    templateUrl: "./cards.component.html",
    styleUrls: ["./cards.component.scss"]
})
export class CardsComponent implements OnInit {
    @Input()
    public type: string = "portrait";

    @Input()
    public imgPaths: { path: string; name: string }[] = [
        {
            path: "../../../../assets/images/cards/engrenagem.png",
            name: "engrenagem"
        }
    ];

    @Input()
    public play: string = "";

    constructor() {}

    ngOnInit(): void {}
}
