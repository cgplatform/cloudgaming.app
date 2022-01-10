import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { SessionService } from "src/app/core/services/session.service";
import { UserQueryService } from "src/app/core/services/user/query.services";
import { AlertComponent } from "src/app/shared/components/alert/alert.component";
import { Field } from "src/app/shared/components/input/models/field.model";

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
                const token = result.data.token;
                const id = result.data.id;
                this.createSession(token, id);
            },(fail:HttpErrorResponse)=>{
                console.log(fail)
                if(fail.message==="email_or_password"){
                    this.appComponent.showMessage("Email ou senha inválidos","error");
                    this.loading =false;
                    return
                }
                this.loading =false;
                this.appComponent.showMessage("Falha ao logar, tente novamente mais tarde","error");
            })
        } else{
            this.appComponent.showMessage("Preencha os campos corretamente","warning");

        }
    }

    createSession(token: string, id:string){
        const temporaryUser = {
            name:"default",
            birthdate: "default",
            phone: "dafualt",
            email:"default",
            token:token
        }
        this._sessionService.set(temporaryUser);
        const variables = {
            id:{
                value: id,
                required:false
            }
        }
        const fields = ["name","email","phone","birthdate","id","verified"]
        this._userQueryService.filterBy(variables,fields).subscribe((result:any)=>{
            this._sessionService.set(result.data);
            this.router.navigate(['/']);
            this.loading =false;

        },(fail:HttpErrorResponse)=>{
            this.appComponent.showMessage("Falha ao criar sessão, tente novamente mais tarde","error");
            this._sessionService.destroy();
            this.loading =false;

        })
    }


}
