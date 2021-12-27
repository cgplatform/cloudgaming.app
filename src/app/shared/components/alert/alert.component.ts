import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "s2p-alert",
    templateUrl: "./alert.component.html",
    styleUrls: ["./alert.component.scss"]
})
export class AlertComponent implements OnInit {
    @Input()
    public information: string = "";

    @Input()
    public type: string = "success";

    public close: boolean = true;

    constructor() {}

    ngOnInit(): void {
        setTimeout(() => (this.close = false), 5000);
    }

    closeAlert() {
        this.close = false;
    }
}
