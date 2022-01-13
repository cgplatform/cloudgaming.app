import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { SessionService } from "src/app/core/services/session.service";
import { UserQueryService } from "src/app/core/services/user/query.services";
import { Field } from "src/app/shared/components/input/models/field.model";
import { ApiErrors } from "src/app/core/errors/api-errors.error";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;


    public loading: boolean = false;


    constructor(
            private router: Router,
            private _userQueryService: UserQueryService,
            private _sessionService: SessionService,
            private appComponent: AppComponent
        ) {
        this.loginForm = new FormGroup({});
        this.loginForm.addControl(
            "email",
            new FormControl("", [Validators.required, Validators.email])
        );
        this.loginForm.addControl(
            "password",
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
            const value = this.loginForm.value;
            this._userQueryService.login(value.email, value.password).subscribe((result:any)=>{
                if (result.errors) {
                    this.loading = false;
                    for (const error of result.errors) {
                        if(error.message in ApiErrors){
                            this.appComponent.showMessage(ApiErrors[error.message],"warning");
                        }else{
                            this.appComponent.showMessage("Falha ao efetuar login, tente novamente mais tarde","error");
                        }
                    }
                    return;
                }
            
                this.createSession(result.data.login.token, value.email);
            },(fail:HttpErrorResponse)=>{
                this.loading =false;
                this.appComponent.showMessage("Falha ao logar, tente novamente mais tarde","error");
            })
        } else{
            this.appComponent.showMessage("Preencha os campos corretamente","warning");

        }
    }

    createSession(token: string, email:string){
        const temporaryUser = {
            name:"default",
            birthdate: "default",
            phone: "dafualt",
            email:"default",
            token: token
        }
        this._sessionService.set(temporaryUser);
        const variables = {
            email:{
                value: email,
                required:false
            }
        }
        const fields = ["name","email","phone","birthdate","id","verified"]
        this._userQueryService.filterBy(variables,fields).subscribe((result:any)=>{
            if (result.errors) {
                this.loading = false;
                for (const error of result.errors) {
                    this.appComponent.showMessage("Falha ao criar sessão, tente novamente mais tarde","error");
                }
                this._sessionService.destroy();
                return;
            }
            const user = result.data.filterBy[0];
            user.token = token;
            this._sessionService.set(user);
            this.router.navigate(['/']);
            this.loading =false;

        },(fail:HttpErrorResponse)=>{
            this.appComponent.showMessage("Falha ao criar sessão, tente novamente mais tarde","error");
            this._sessionService.destroy();
            this.loading =false;
        })
    }


}
