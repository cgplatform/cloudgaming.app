import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SessionService } from "src/app/core/services/session.service";
import { UserQueryService } from "src/app/core/services/user/query.services";
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

    constructor(
            private router: Router,
            private _userQueryService: UserQueryService,
            private _sessionService: SessionService
        ) {
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
                type: "password",
                placeholder: "Digite sua senha",
                labelLink: {
                    text: "Esqueceu sua senha?",
                    url: "/recovery/email"
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

    loggIn() {
        if (this.loginForm.valid) {
            this.loading =true;
            const value = this.loginForm.value
            this._userQueryService.login(value.email, value.password).subscribe((result:any)=>{
                const token = result.data.token;
            },(fail:HttpErrorResponse)=>{

            })
        } else {
            this.close = !this.close;
        }
    }


}
