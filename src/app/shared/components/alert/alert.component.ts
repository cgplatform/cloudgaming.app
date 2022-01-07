import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: "s2p-alert",
    templateUrl: "./alert.component.html",
    styleUrls: ["./alert.component.scss"]
})
export class AlertComponent implements OnInit {
    @Output()
    public controller = new EventEmitter<{
        instance: any;
    }>();

    @Input()
    public type: string = "success";

    @Input()
    public message: string;

    @Input()
    public show: boolean = true;

    constructor() {
        this.message = "";
        this.controller.emit();
    }

    ngOnInit(): void {
        setTimeout(() => (this.show = false), 5000);
    }

    closeAlert() {
        this.show = false;
    }

    showMessage(message: string, type: string) {
        this.message = message;
        this.type = type;
        this.show = true;
        setTimeout(() => (this.show = false), 5000);
    }
}
