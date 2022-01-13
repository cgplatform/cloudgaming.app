import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { ApiErrors } from "src/app/core/errors/api-errors.error";
import { UserQueryService } from "src/app/core/services/user/query.services";
import { Field } from "src/app/shared/components/input/models/field.model";

@Component({
    selector: "app-recovery-email",
    templateUrl: "./recovery-email.component.html",
    styleUrls: ["./recovery-email.component.scss"]
})
export class RecoveryEmailComponent implements OnInit {
    public loginForm: FormGroup;

    public close: boolean = false;

    public loading: boolean = false;

    public error = { visible: false, message: "" };

    constructor(
        private router: Router,
        private userQueryService: UserQueryService,
        private appComponent: AppComponent
    ) {
        this.loginForm = new FormGroup({});
        this.loginForm.addControl(
            "email",
            new FormControl("", [Validators.required, Validators.email])
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
            }
        ];
    }

    private get email(): string {
        return this.loginForm.value.email;
    }

    public getFormControl(field: string) {
        return this.loginForm.get(field) as FormControl;
    }

    public submit() {
        if (this.loginForm.invalid) {
            return this.loginForm.markAllAsTouched();
        }

        this.loading = true;

        this.userQueryService
            .recovery(this.email)
            .subscribe((response: any) => {
                if (response.errors) {
                    this.loading = false;
                    for (const error of response.errors) {
                        if(error.message in ApiErrors){
                            this.appComponent.showMessage(ApiErrors[error.message],"warning");
                        }else{
                            this.appComponent.showMessage("Falha ao enviar email, tente novamente mais tarde","error");
                        }
                    }
                    return;
                }
                this.router.navigate(["/recovery/confirmation"]);
            });
    }

    buttonClick() {
        this.submit();
    }

}
