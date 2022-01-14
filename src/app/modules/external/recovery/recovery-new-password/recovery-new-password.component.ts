import { Component, OnInit } from "@angular/core";
import {
    AbstractControl,
    FormControl,
    FormGroup,
    Validators
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { ApiErrors } from "src/app/core/errors/api-errors.error";
import { UserMutationService } from "src/app/core/services/user/mutation.services";
import { Field } from "src/app/shared/components/input/models/field.model";

@Component({
    selector: "app-recovery-new-password",
    templateUrl: "./recovery-new-password.component.html",
    styleUrls: ["./recovery-new-password.component.scss"]
})
export class RecoveryNewPasswordComponent implements OnInit {
    public loginForm: FormGroup;

    public close: boolean = false;

    public loading: boolean = false;

    private params: any;



    public error = { visible: false, message: "" };

    constructor(
        private router: Router,
        private activadedRoute: ActivatedRoute,
        private userMutationService: UserMutationService,
        private appComponent: AppComponent
    ) {
        ApiErrors.invalid_token="Solicite a redefinição de senha novamente!";
        this.loginForm = new FormGroup({});
        this.loginForm.addControl(
            "passwordControl",
            new FormControl("", [Validators.required])
        );
        this.loginForm.addControl(
            "passwordControlRepeat",
            new FormControl("", [Validators.required, this.validatorPassword])
        );

        this.loginForm
            .get("passwordControl")
            ?.valueChanges.pipe()
            .subscribe((value) => {
                this.loginForm
                    .get("passwordControlRepeat")
                    ?.updateValueAndValidity();
            });
    }

    ngOnInit(): void {
        this.activadedRoute.params.subscribe((params) => {
            this.params = params;
        });
    }

    public get profileFormFields(): Field[] {
        return [
            {
                type: "password",
                placeholder: "Digite sua senha",
                errors: {
                    required: "O campo é obrigatório"
                }
            },
            {
                type: "password",
                placeholder: "Digite sua senha",
                errors: {
                    required: "O campo é obrigatório",
                    equal: "Senhas não compativeís"
                }
            }
        ];
    }

    public getFormControl(field: string) {
        return this.loginForm.get(field) as FormControl;
    }

    private get password() {
        return this.loginForm.value.passwordControl;
    }

    public submit() {
        if (this.loginForm.invalid) {
            return this.loginForm.markAllAsTouched();
        }

        this.loading = true;

        this.userMutationService
            .resetPassword(this.password, this.params.token, ["name"])
            .subscribe((response: any) => {
                if (response.errors) {
                    this.loading = false;
                    for (const error of response.errors) {
                        if(error.message in ApiErrors){
                            this.appComponent.showMessage(ApiErrors[error.message],"warning");
                        }else{
                            this.appComponent.showMessage("Falha ao efetuar redefinição da senha, tente novamente mais tarde","error");
                        }
                    }
                    return;
                }
                this.router.navigate(["/"]);
            });
    }

    buttonClick() {
        this.submit();
    }


    validatorPassword = (input: AbstractControl) => {
        if (!this.loginForm.get("passwordControl")?.value) {
            return null;
        }
        if (this.loginForm.get("passwordControl")?.value == input.value) {
            return null;
        }
        return { equal: true };
    };
}
