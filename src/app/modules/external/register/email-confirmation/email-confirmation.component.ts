import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { ApiErrors } from "src/app/core/errors/api-errors.error";
import { SessionService } from "src/app/core/services/session.service";
import { UserQueryService } from "src/app/core/services/user/query.services";

@Component({
    selector: "app-email-confirmation",
    templateUrl: "./email-confirmation.component.html",
    styleUrls: ["./email-confirmation.component.scss"]
})
export class EmailConfirmationComponent implements OnInit {

   
    private params: any;

    constructor(
        private router: Router,
        private activadedRoute: ActivatedRoute,
        private _userQueryService: UserQueryService,
        private _sessionService: SessionService,
        private appComponent: AppComponent
        ) {
            ApiErrors.invalid_token="A verificação de email falhou, entre em contato com o suporte";
        }

    ngOnInit(): void {
        this.activadedRoute.params.subscribe((params: any) => {
            this.params = params;
            this.verifyAccount();
        });
    }

    private verifyAccount() {
        console.log(this.params)
        if (!this.params.token) {
            return;
        }

        this._userQueryService
            .confirmEmail(this.params.token)
            .subscribe((response: any) => {
                if (response.errors) {
                    for (const error of response.errors) {
                        if(error.message in ApiErrors){
                            this.appComponent.showMessage(ApiErrors[error.message],"warning");
                        }else{
                            this.appComponent.showMessage("Falha ao confirmar e-mail, tente novamente mais tarde","error");
                        }
                    }
                    return;
                }
                console.log(response)
                const token = response.emailConfirmation.token;
                const email = response.emailConfirmation.email;
                this.createSession(token, email);
            },(fail:any)=>{
                this.appComponent.showMessage("Falha ao confirmar e-mail, tente novamente mais tarde","error");
            });
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
                for (const error of result.errors) {
                    this.appComponent.showMessage("Falha ao criar sessão, tente novamente mais tarde","error");
                }
                this._sessionService.destroy();
                return;
            }
            const user = result.data.filterBy[0];
            user.token = token;
            this._sessionService.set(user);
            this.router.navigate(["/"])

        },(fail:HttpErrorResponse)=>{
            this.appComponent.showMessage("Falha ao criar sessão, tente novamente mais tarde","error");
            this._sessionService.destroy();
        })
    }
}
