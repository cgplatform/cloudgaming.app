import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { User } from "src/app/core/models/user.model";
import { SessionService } from "src/app/core/services/session.service";
import { UserMutationService } from "src/app/core/services/user/mutation.services";
import { AlertComponent } from "src/app/shared/components/alert/alert.component";
import { Field } from "src/app/shared/components/input/models/field.model";
import { ModalController } from "src/app/shared/components/modal/models/modal-controller.model";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent extends ModalController implements OnInit {

    public profileForm: FormGroup;

    public isEditing: boolean = false;
    public isLoading = {
        delete: false,
        update: false
    };

    public updateButtonText: string = "Alterar dados";
    public cancelButtonText: string = "Desativar Usuário";

    public userSession={
        name: "Luiz",
        birthdate: "11/01/2001",
        email:"luizeduardo112001@gmail.com",
        phone: "31989293599"
    };

    public passwordControl: FormControl;


    constructor(
        private router: Router,
        private appComponent: AppComponent,
        private _userMutationService: UserMutationService
    ) {
        super();
      
        this.profileForm = new FormGroup({});
        this.passwordControl = new FormControl('',[Validators.required]);

        if(!this.userSession){
            this.router.navigate(['']);
            return;
        }

        this.profileForm.addControl(
            "name",
            new FormControl(this.userSession.name, [Validators.required])
        );
        this.profileForm.addControl(
            "email",
            new FormControl(this.userSession.email, [
                Validators.required,
                Validators.email
            ])
        );
        this.profileForm.addControl(
            "phone",
            new FormControl(this.userSession.phone, [Validators.required])
        );
        this.profileForm.addControl(
            "birthDay",
            new FormControl(this.userSession.birthdate.substring(0,2), [Validators.required])
        );
        this.profileForm.addControl(
            "birthMonth",
            new FormControl(this.userSession.birthdate.substring(3,5), [Validators.required])
        );
        this.profileForm.addControl(
            "birthYear",
            new FormControl(this.userSession.birthdate.substring(6), [Validators.required])
        );
        this.profileForm.disable();
    }

    ngOnInit(): void {}

    public get profileFormFields(): Field[] {
        return [
            {
                type: "text",
                label: "Nome",
                errors: {
                    required: "O campo é obrigatório"
                }
            },
            {
                type: "text",
                label: "Email",
                errors: {
                    required: "O campo é obrigatório",
                    email: "Formato incorreto"
                }
            },
            {
                type: "text",
                label: "Telefone",
                mask: "(00) 0 0000-0000",
                errors: {
                    required: "O campo é obrigatório"
                }
            },
            {
                type: "text",
                mask: "00",
                label: "Dia",
                errors: {
                    required: "Obrigatório"
                }
            },
            {
                type: "text",
                mask: "00",
                label: "Mês",
                errors: {
                    required: "Obrigatório"
                }
            },
            {
                type: "text",
                mask: "0000",
                label: "Ano",
                errors: {
                    required: "Obrigatório"
                }
            },{
                type: "password",
                label: "Senha",
                errors: {
                    required: "Obrigatório"
                }
            }
        ];
    }

  


    public update() {
        if (this.profileForm.disabled) {
            this.profileForm.enable();
            this.updateButtonText = "Salvar Alterações";
            this.cancelButtonText = "Cancelar";
        } else {
            if(this.profileForm.invalid){
                return;
            }
            this.isLoading.update=true;
            const updatedUser = this.profileForm.value;
            const fixedDate = {
                name: updatedUser.name,
                birthdate: `${updatedUser.birthDay}/${updatedUser.birthMonth}/${updatedUser.birthYear}`,
                email: updatedUser.email,
                phone: updatedUser.phone,
            }
            const fields = ["name"]
            this._userMutationService.updateBy(fixedDate,fields).subscribe((result:any)=>{
                this.appComponent.showMessage("Usuário atualizado com sucesso", "success");
                this.isLoading.update=false;
            },(fail:HttpErrorResponse)=>{
                this.appComponent.showMessage("Falha ao atualizar usuário", "error");
                this.isLoading.update=false;
            });
        }
    }

    public cancel() {
        if (this.profileForm.disabled) {
            this.passwordControl.reset();
            this.openModal("modalPassword");
        } else {
            this.profileForm.disable();
            this.updateButtonText = "Alterar dados";
            this.cancelButtonText = "Desativar Usuário";
        }
    }

    removeUser(){
        this.isLoading.delete=true;
        this._userMutationService.delete(this.passwordControl.value).subscribe((resul:any)=>{
            this.router.navigate(['']);
            this.isLoading.delete=false;
            this.closeModal("modalPassword");
        },(fail:HttpErrorResponse)=>{
            if(fail.message==="wrong_password"){
                this.appComponent.showMessage("Senha incorreta", "error");
                
            }
            this.appComponent.showMessage("Falha ao deletar usuário", "error");
            this.isLoading.delete=false;
            this.closeModal("modalPassword");
        })
    }

    //Methods to use only in tha HTML
    public getFormControl(field: string) {
        return this.profileForm.get(field) as FormControl;
    }
}
