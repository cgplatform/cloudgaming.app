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

    @Input()
    public title: string = "";

    @Output()
    public startIcon: EventEmitter<{}>;

    constructor() {
        this.startIcon = new EventEmitter();
    }

    ngOnInit(): void {}

    clickPlay(index:number) {
        this.startIcon.emit(index);
    }
}
