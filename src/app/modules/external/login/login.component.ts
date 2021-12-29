import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Field } from "src/app/shared/components/input/models/field.model";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;

    public close: boolean = false;

    public loading: boolean = false;

    constructor(private router: Router) {
        this.loginForm = new FormGroup({});
        this.loginForm.addControl(
            "emailControl",
            new FormControl("", [Validators.required, Validators.email])
        );
        this.loginForm.addControl(
            "senhaControl",
            new FormControl("", [Validators.required])
        );
    }

    ngOnInit(): void {}

    public get profileFormFields(): Field[] {
        return [
            {
                type: "text",
                placeholder: "Digite seu e-mail",
                errors: {
                    email: "E-mail inválido",
                    required: "O campo é obrigatório"
                }
            },
            {
                type: "text",
                placeholder: "Digite sua senha",
                labelLink: {
                    text: "Esqueceu sua senha?",
                    url: "/external/recovery-email"
                },
                errors: {
                    required: "O campo é obrigatório"
                }
            }
        ];
    }

    public getFormControl(field: string) {
        return this.loginForm.get(field) as FormControl;
    }

    buttonClick() {
        if (this.loginForm.valid) {
            this.loading = !this.loading;
            //TODO mudar rota para rota da tela de entrada 2
            this.router.navigate(["/internal/profile"]);
        } else {
            this.close = !this.close;
        }
    }
}
