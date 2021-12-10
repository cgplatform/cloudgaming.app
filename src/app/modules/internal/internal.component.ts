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

    private readonly modals: Map<string, any>;

    public loading: boolean = false;

    constructor() {
        this.modals = new Map();
    }

    ngOnInit(): void {

    }

    closeModal(id: string) {
        if (!this.modals.has(id)) return;
        this.modals.get(id).close();
    }

    openModal(id: string) {
        if (!this.modals.has(id)) return;

        this.modals.get(id).open();
    }

    modalInstance(event: any) {
        this.modals.set(event.id, event.instance);
    }

    clickIcone(content: any) {
        console.log(content);
        console.log("capturei o click");
    }

    clickText(content: any) {
        console.log(content);
        console.log("capturei o click");
    }

    clickPlay(content: any) {
        console.log(content);
        console.log("capturei o Play");
        this.openModal('Teste');
    }
}
