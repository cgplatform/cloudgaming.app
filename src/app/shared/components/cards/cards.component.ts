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
    public imgPath: string = "../../../../assets/images/cards/engrenagem.png";

    constructor() {}

    ngOnInit(): void {}
}
