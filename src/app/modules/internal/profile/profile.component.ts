import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { ApiErrors } from "src/app/core/errors/api-errors.error";
import { User } from "src/app/core/models/user.model";
import { SessionService } from "src/app/core/services/session.service";
import { UserMutationService } from "src/app/core/services/user/mutation.services";
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

    public userSession!: User;

    public passwordControl: FormControl;


    constructor(
        private router: Router,
        private appComponent: AppComponent,
        private _userMutationService: UserMutationService,
        private _sessionService: SessionService
    ) {
        super();
        this.profileForm = new FormGroup({});
        this.passwordControl = new FormControl('',[Validators.required]);

        try{
            this.userSession = this._sessionService.get();
        }catch(err){
            this._sessionService.destroy();
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
            new FormControl(this.userSession.phone, [Validators.required, Validators.minLength(11)])
        );
        this.profileForm.addControl(
            "birthDay",
            new FormControl(this.userSession.birthdate.substring(0,2), [Validators.required, Validators.max(31), Validators.min(1)])
        );
        this.profileForm.addControl(
            "birthMonth",
            new FormControl(this.userSession.birthdate.substring(3,5), [Validators.required, Validators.max(12), Validators.min(1)])
        );
        this.profileForm.addControl(
            "birthYear",
            new FormControl(this.userSession.birthdate.substring(6), [Validators.required, Validators.max(new Date().getFullYear()), Validators.min(1)])
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
                    required: "O campo é obrigatório",
                    minlength: "Telefone inválido"
                }
            },
            {
                type: "text",
                mask: "00",
                label: "Dia",
                errors: {
                    required: "Obrigatório",
                    min: "Dia inválido",
                    max: "Dia inválido"
                }
            },
            {
                type: "text",
                mask: "00",
                label: "Mês",
                errors: {
                    required: "Obrigatório",
                    min: "Mês inválido",
                    max: "Mês inválido"
                }
            },
            {
                type: "text",
                mask: "0000",
                label: "Ano",
                errors: {
                    required: "Obrigatório",
                    min: "Ano inválido",
                    max: "Ano inválido"
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
                this.appComponent.showMessage("Há campos mal preenchidos", "warning");
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
            const fields = ["name","phone","birthdate","email","verified"]
            this._userMutationService.updateBy(fixedDate,fields).subscribe((result:any)=>{
                if (result.errors) {
                    this.isLoading.delete = false;
                    for (const error of result.errors) {
                        if(error.message in ApiErrors){
                            this.appComponent.showMessage(ApiErrors[error.message],"warning");
                        }else{
                            this.appComponent.showMessage("Falha ao atualizar usuário","error");
                        }
                    }
                    return;
                }
                this.appComponent.showMessage("Usuário atualizado com sucesso", "success");
                const updatedUser = result.data.updateBy;
                updatedUser.token = this.userSession.token;
                this._sessionService.set(updatedUser);
                this.isLoading.update=false;
                this.profileForm.disable();
                this.updateButtonText = "Alterar dados";
                this.cancelButtonText = "Desativar Usuário";
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
            this.resetUser();
            this.updateButtonText = "Alterar dados";
            this.cancelButtonText = "Desativar Usuário";
        }
    }

    public resetUser(){
        this.profileForm.setValue({
            name: this.userSession.name,
            email: this.userSession.email,
            phone: this.userSession.phone,
            birthDay: this.userSession.birthdate.substring(0,2),
            birthMonth: this.userSession.birthdate.substring(3,5),
            birthYear: this.userSession.birthdate.substring(6)
        })
    }

    public removeUser(){
        this.isLoading.delete=true;
        this._userMutationService.delete(this.passwordControl.value).subscribe((result:any)=>{
            if (result.errors) {
                this.isLoading.delete = false;
                for (const error of result.errors) {
                    if(error.message in ApiErrors){
                        this.appComponent.showMessage(ApiErrors[error.message],"warning");
                    }else{
                        this.appComponent.showMessage("Falha ao deletar usuário","error");
                    }
                }
                return;
            }
            this._sessionService.destroy();
            this.isLoading.delete=false;
            this.closeModal("modalPassword");
        },(fail:HttpErrorResponse)=>{
            this.appComponent.showMessage("Falha ao deletar usuário", "error");
            this.isLoading.delete=false;
            this.closeModal("modalPassword");
        })
    }

    public logOut(){
        this._sessionService.destroy();
    }

    //Methods to use only in tha HTML
    public getFormControl(field: string) {
        return this.profileForm.get(field) as FormControl;
    }
}
