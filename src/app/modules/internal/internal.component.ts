import { Component, Input, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Field } from "src/app/shared/components/input/models/field.model";

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

    public emailControl = new FormControl("", [Validators.required, Validators.email]);
    public selectControl = new FormControl("");
    public textareaControl = new FormControl("");

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

    public get emailField(): Field {
        return {
            type: "text",
            placeholder: "Insira seu e-mail",
            errors: {
                "email": "E-mail inválido",
                "required": "O campo é obrigatório"

            }
        };
    }

    public get selectField(): Field {
        return {
            type: "select",
            placeholder: "Selecione uma opção",
            options: [
                {
                    key: "1",
                    value: "Primeira Opção"
                },
                {
                    key: "2",
                    value: "Segunda Opção"
                },
                {
                    key: "3",
                    value: "Terceira Opção"
                }
            ]
        };
    }

    public get textareaField(): Field {
        return {
            type: "textarea",
            placeholder: "Digite o texto"
        };
    }

    buttonClick() {
        this.loading = !this.loading;
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
