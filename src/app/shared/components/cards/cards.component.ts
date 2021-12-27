import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: "s2p-cards",
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

    @Output()
    public iconeStart: EventEmitter<{}>;

    constructor() {
        this.iconeStart = new EventEmitter();
    }

    ngOnInit(): void {}

    clickPlay() {
        this.iconeStart.emit("Clicou no Play");
    }
}
