import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: "s2p-modal[id][controller]",
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnInit {
    public readonly modalClasses: Set<string>;
    private effectTime: ReturnType<typeof setTimeout> | undefined;

    @Output()
    public controller = new EventEmitter<{
        id: string;
        instance: any;
    }>();

    @Input()
    public id!: string;


    constructor() {
        this.modalClasses = new Set();
    }

    private setTime(callback: Function) {
        this.effectTime = setTimeout(() => {
            callback();
            this.effectTime = undefined;
        }, 500);
    }

    public open(): void {
        if (this.modalClasses.has("open") || this.modalClasses.has("closing")) {
            return;
        }

        const body = document.body;
        const modal = document.getElementById(this.id);

        if (modal != null) {
            this.modalClasses.add("opening");
            body.classList.add("disableScroll");

            this.setTime(() => {
                this.modalClasses.add("open");
                this.modalClasses.delete("opening");
            });

            const childrens = Array.from(modal.children);
            childrens.forEach((children) => {
                children.scrollTop = 0;
            });
        }
    }

    public close(): void {
        if (!this.modalClasses.has("open") || this.effectTime) {
            return;
        }

        const body = document.body;

        this.modalClasses.add("closing");
        this.modalClasses.delete("open");

        this.setTime(() => {
            this.modalClasses.delete("closing");
            body.classList.remove("disableScroll");
        });
    }

    ngOnInit(): void {
        if (!this.id) {
            throw new Error("Invalid component id");
        }

        this.controller.emit({
            id: this.id,
            instance: this
        });

        const modal = document.getElementById(this.id);

        if (modal != null) {
            modal.addEventListener("click", (e) => {
                const element = e.target as HTMLElement;
                if (element.id !== this.id || this.effectTime) return;

                this.close();
            });
        }
    }
}
