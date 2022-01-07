import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Field } from "src/app/shared/components/input/models/field.model";

@Component({
    selector: "app-register-data",
    templateUrl: "./register-data.component.html",
    styleUrls: ["./register-data.component.scss"]
})
export class RegisterDataComponent implements OnInit {
    public registerForm: FormGroup;
    public loading: boolean = false;
    public close: boolean = false;

    constructor(private router: Router) {
        this.registerForm = new FormGroup({});
        this.registerForm.addControl(
            "firstName",
            new FormControl("", [Validators.required])
        );
        this.registerForm.addControl(
            "secondName",
            new FormControl("", [Validators.required])
        );
        this.registerForm.addControl(
            "email",
            new FormControl("", [Validators.required, Validators.email])
        );
        this.registerForm.addControl(
            "phone",
            new FormControl("", [Validators.required])
        );
        this.registerForm.addControl(
            "birthDay",
            new FormControl("", [Validators.required])
        );
        this.registerForm.addControl(
            "birthMonth",
            new FormControl("", [Validators.required])
        );
        this.registerForm.addControl(
            "birthYear",
            new FormControl("", [Validators.required])
        );
        this.registerForm.addControl(
            "password",
            new FormControl("", [Validators.required])
        );
    }

    ngOnInit(): void {}

    public get registerFormFields(): Field[] {
        return [
            {
                type: "text",
                ignoreRequired: true,
                label: "Nome",
                errors: {
                    required: "O campo é obrigatório"
                }
            },
            {
                type: "text",
                ignoreRequired: true,
                label: "Sobrenome",
                errors: {
                    required: "O campo é obrigatório"
                }
            },
            {
                type: "text",
                ignoreRequired: true,
                label: "Email",
                errors: {
                    required: "O campo é obrigatório",
                    email: "Formato incorreto"
                }
            },
            {
                type: "text",
                placeholder: "(00) 0 0000-0000",
                ignoreRequired: true,
                label: "Celular",
                mask: "(00) 0 0000-0000",
                errors: {
                    required: "O campo é obrigatório"
                }
            },
            {
                type: "text",
                placeholder: "00",
                ignoreRequired: true,
                mask: "00",
                label: "Dia",
                errors: {
                    required: "Obrigatório"
                }
            },
            {
                type: "text",
                placeholder: "00",
                ignoreRequired: true,
                mask: "00",
                label: "Mês",
                errors: {
                    required: "Obrigatório"
                }
            },
            {
                type: "text",
                placeholder: "0000",
                ignoreRequired: true,
                mask: "0000",
                label: "Ano",
                errors: {
                    required: "Obrigatório"
                }
            },
            {
                type: "password",
                ignoreRequired: true,
                label: "Senha",
                errors: {
                    required: "Obrigatório"
                }
            }
        ];
    }

    //Methods to use only in tha HTML
    public getFormControl(field: string) {
        return this.registerForm.get(field) as FormControl;
    }

    buttonClick() {
        console.log(this.registerForm.valid);
        if (this.registerForm.valid) {
            this.loading = !this.loading;
            //TODO mudar rota
            this.router.navigate(["/profile"]);
        } else {
            this.close = !this.close;
        }
    }
}
