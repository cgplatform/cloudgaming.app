import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
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

    constructor(private router: Router) {
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
    public getFormControl(field: string) {
        return this.loginForm.get(field) as FormControl;
    }

    buttonClick() {
        if (this.loginForm.valid) {
            this.loading = !this.loading;
            this.router.navigate(["/external/recovery-confirmation"]);
        } else this.close = !this.close;
    }
}
