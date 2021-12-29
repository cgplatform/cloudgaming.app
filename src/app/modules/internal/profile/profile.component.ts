import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Field } from "src/app/shared/components/input/models/field.model";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
    public profileForm: FormGroup;

    public isEditing: boolean = false;
    public isLoading: boolean = false;

    public updateButtonText: string = "Alterar dados";
    public cancelButtonText: string = "Desativar Usuário";

    constructor() {
        this.profileForm = new FormGroup({});
        this.profileForm.addControl(
            "firstName",
            new FormControl("Arthur Morais", [Validators.required])
        );
        this.profileForm.addControl(
            "secondName",
            new FormControl("Pimentel", [Validators.required])
        );
        this.profileForm.addControl(
            "email",
            new FormControl("guaxininanonimo@gmail.com", [
                Validators.required,
                Validators.email
            ])
        );
        this.profileForm.addControl(
            "phone",
            new FormControl("(31)99999-9999", [Validators.required])
        );
        this.profileForm.addControl(
            "birthDay",
            new FormControl("11", [Validators.required])
        );
        this.profileForm.addControl(
            "birthMonth",
            new FormControl("01", [Validators.required])
        );
        this.profileForm.addControl(
            "birthYear",
            new FormControl("2001", [Validators.required])
        );
        this.profileForm.disable();
    }

    ngOnInit(): void {}

    public get profileFormFields(): Field[] {
        return [
            {
                type: "text",
                label: "Nome",
                errors: {
                    required: "O campo é obrigatório"
                }
            },
            {
                type: "text",
                label: "Sobrenome",
                errors: {
                    required: "O campo é obrigatório"
                }
            },
            {
                type: "text",
                label: "Email",
                errors: {
                    required: "O campo é obrigatório",
                    email: "Formato incorreto"
                }
            },
            {
                type: "text",
                label: "Telefone",
                errors: {
                    required: "O campo é obrigatório"
                }
            },
            {
                type: "number",
                label: "Dia",
                errors: {
                    required: "Obrigatório"
                }
            },
            {
                type: "number",
                label: "Mês",
                errors: {
                    required: "Obrigatório"
                }
            },
            {
                type: "number",
                label: "Ano",
                errors: {
                    required: "Obrigatório"
                }
            }
        ];
    }

    public update() {
        if (this.profileForm.disabled) {
            this.profileForm.enable();
            this.updateButtonText = "Salvar Alterações";
            this.cancelButtonText = "Cancelar";
        } else {
        }
    }

    public cancel() {
        if (this.profileForm.disabled) {
        } else {
            this.profileForm.disable();
            this.updateButtonText = "Alterar dados";
            this.cancelButtonText = "Desativar Usuário";
        }
    }

    //Methods to use only in tha HTML
    public getFormControl(field: string) {
        return this.profileForm.get(field) as FormControl;
    }
}
