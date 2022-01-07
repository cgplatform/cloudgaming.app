import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
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

    constructor(
        private router: Router,
        private userQueryService: UserQueryService
    ) {
        this.loginForm = new FormGroup({});
        this.loginForm.addControl(
            "emailControl",
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

    private get email() {
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
                }
            });
    }

    buttonClick() {
        this.submit();
        console.log(this.loading);
        if (this.loginForm.valid && this.loading) {
            this.router.navigate(["/recovery/confirmation"]);
        } else this.close = !this.close;
    }
}
