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

    public type: string = "success";

    public message: string;

    public show: boolean = false;

    constructor() {
        this.message="";
        this.controller.emit();
    }

    ngOnInit(): void {
        setTimeout(() => (this.show = false), 5000);
    }

    closeAlert() {
        this.show = false;
    }

    showMessage(message: string, type: string){
        this.message=message;
        this.type=type;
        this.show=true;
        setTimeout(() => (this.show = false), 5000);
    }

}
