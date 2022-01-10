import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { timeout } from "rxjs";

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
    public alertClasses: Set<string>;

    public currentTimeout: any;
    public effectTime: ReturnType<typeof setTimeout> | undefined;

    public types: Map<string, string>;

    constructor() {
        this.message = "";
        
        this.types= new Map();
        this.types.set("error","Erro");
        this.types.set("success","Sucesso");
        this.types.set("warning","Aviso");
        this.types.set("info","Informação");

        this.alertClasses=new Set();
    }

    ngOnInit(): void {
        this.controller.emit({
            instance: this
        });
    }

    closeAlert() {
        clearTimeout(this.currentTimeout);
        this.currentTimeout=null;
        this.alertClasses.add("hiding");
        this.setTime(()=>{
            this.alertClasses.delete("hiding");
            this.show = false; 
        })
    }

    showMessage(message: string, type: string) {
        console.log("passei")
        //if there is an alert already on the screen
        if(this.currentTimeout){
            clearTimeout(this.currentTimeout);
            this.currentTimeout=null;
            this.alertClasses.add("hiding");
            this.setTime(()=>{
                this.alertClasses.delete("hiding");
                this.showMessage(message, type);
            })
            return;
        }

        //If there is an alert in the hidding process
        if(this.alertClasses.has("hiding")){
            this.setTime(()=>{
                this.showMessage(message, type);
            });
            return;
        }

        //If there is no alert in the showing process
        if(!this.alertClasses.has("showing")){
            this.alertClasses.add("showing");
            this.setTime(()=>{
                this.alertClasses.delete("showing");
            });
        } 

        this.message = message;
        this.type = type;
        this.show = true;

        this.currentTimeout = setTimeout(()=>{
            this.closeAlert();
        }, 500000);
    }

    private setTime(callback: Function) {
        this.effectTime = setTimeout(() => {
            callback();
            this.effectTime = undefined;
        }, 500);
    }

}
