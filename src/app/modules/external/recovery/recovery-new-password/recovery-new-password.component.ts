import { Component, OnInit } from "@angular/core";
import {
    AbstractControl,
    FormControl,
    FormGroup,
    Validators
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
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

    constructor(
        private router: Router,
        private activadedRoute: ActivatedRoute
    ) {
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
        console.log(this.params.token);
    }

    public get profileFormFields(): Field[] {
        return [
            {
                type: "text",
                placeholder: "Digite sua senha",
                errors: {
                    required: "O campo é obrigatório"
                }
            },
            {
                type: "text",
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

    buttonClick() {
        if (this.loginForm.valid) {
            this.loading = !this.loading;
            //TODO mudar rota para rota da tela de entrada 2
            this.router.navigate(["/profile"]);
        } else this.close = !this.close;
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
