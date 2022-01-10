import { Component, OnInit } from "@angular/core";
import {
    FormControl,
    FormGroup,
    ValidatorFn,
    Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { UserMutationService } from "src/app/core/services/user/mutation.services";
import { User } from "src/app/core/models/user.model";
import { Field } from "src/app/shared/components/input/models/field.model";
import { UserQueryService } from "src/app/core/services/user/query.services";

@Component({
    selector: "app-register-data",
    templateUrl: "./register-data.component.html",
    styleUrls: ["./register-data.component.scss"]
})
export class RegisterDataComponent implements OnInit {
    public registerForm: FormGroup;
    public loading: boolean = false;
    public close: boolean = false;

    private internalValidators = {
        repeat:
            (alias: string): ValidatorFn =>
            (control: any) =>
                this.repeatValidator(alias, control.value)
                    ? { repeat: true }
                    : null
    };

    private alreadyExistsFields: { [key: string]: string[] } = {
        email: []
    };

    constructor(
        private router: Router,
        private userMutationService: UserMutationService
    ) {
        this.registerForm = new FormGroup({});
        this.registerForm.addControl(
            "firstName",
            new FormControl("", [Validators.required])
        );
        this.registerForm.addControl(
            "secondName",
            new FormControl("", [Validators.required])
        );
        this.registerForm.addControl(
            "email",
            new FormControl("", [
                Validators.required,
                Validators.email,
                this.internalValidators.repeat("email")
            ])
        );
        this.registerForm.addControl(
            "phone",
            new FormControl("", [Validators.required])
        );
        this.registerForm.addControl(
            "birthDay",
            new FormControl("", [Validators.required])
        );
        this.registerForm.addControl(
            "birthMonth",
            new FormControl("", [Validators.required])
        );
        this.registerForm.addControl(
            "birthYear",
            new FormControl("", [Validators.required])
        );
        this.registerForm.addControl(
            "password",
            new FormControl("", [Validators.required])
        );
    }

    private repeatValidator(alias: string, fieldValue: string): boolean {
        const values = this.alreadyExistsFields[alias];

        if (!values) return false;

        for (let value of values) {
            if (value === fieldValue) return true;
        }

        return false;
    }

    ngOnInit(): void {}

    public get registerFormFields(): Field[] {
        return [
            {
                type: "text",
                ignoreRequired: true,
                label: "Nome",
                errors: {
                    required: "O campo é obrigatório"
                }
            },
            {
                type: "text",
                ignoreRequired: true,
                label: "Sobrenome",
                errors: {
                    required: "O campo é obrigatório"
                }
            },
            {
                type: "text",
                ignoreRequired: true,
                label: "Email",
                errors: {
                    required: "O campo é obrigatório",
                    email: "Formato incorreto",
                    repeat: "O email informado já está em uso!"
                }
            },
            {
                type: "text",
                placeholder: "(00) 0 0000-0000",
                ignoreRequired: true,
                label: "Celular",
                mask: "(00) 0 0000-0000",
                errors: {
                    required: "O campo é obrigatório"
                }
            },
            {
                type: "text",
                placeholder: "00",
                ignoreRequired: true,
                mask: "00",
                label: "Dia",
                errors: {
                    required: "Obrigatório"
                }
            },
            {
                type: "text",
                placeholder: "00",
                ignoreRequired: true,
                mask: "00",
                label: "Mês",
                errors: {
                    required: "Obrigatório"
                }
            },
            {
                type: "text",
                placeholder: "0000",
                ignoreRequired: true,
                mask: "0000",
                label: "Ano",
                errors: {
                    required: "Obrigatório"
                }
            },
            {
                type: "password",
                ignoreRequired: true,
                label: "Senha",
                errors: {
                    required: "Obrigatório"
                }
            }
        ];
    }

    private get name() {
        return (
            this.registerForm.value.firstName +
            this.registerForm.value.secondName
        );
    }

    private get email() {
        return this.registerForm.value.email;
    }

    private get phone() {
        return this.registerForm.value.phone;
    }

    private get birthdate() {
        const day = this.registerForm.value.birthDay;
        const month = this.registerForm.value.birthMonth;
        const year = this.registerForm.value.birthYear;

        return `${day}/${month}/${year}`;
    }

    private get password() {
        return this.registerForm.value.password;
    }

    //Methods to use only in tha HTML
    public getFormControl(field: string) {
        return this.registerForm.get(field) as FormControl;
    }

    public setError(user: User, alias: string) {
        switch (alias) {
            case "repeat_email":
                this.alreadyExistsFields["email"].push(user.email);
                this.registerForm.updateValueAndValidity();
                break;
        }
    }

    public submit() {
        if (this.registerForm.invalid) {
            return this.registerForm.markAllAsTouched();
        }

        this.loading = true;

        const user: User = {
            name: this.name,
            email: this.email,
            phone: this.phone,
            birthdate: this.birthdate,
            password: this.password
        };

        this.userMutationService
            .create(user, ["id"])
            .subscribe((response: any) => {
                if (response.errors) {
                    for (const error of response.errors) {
                        this.setError(user, error.message);
                    }

                    this.loading = false;

                    return;
                }

                this.router.navigateByUrl("/register/sucess");
            });
    }

    buttonClick() {
        this.submit();
    }
}
