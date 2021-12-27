import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Field } from 'src/app/shared/components/input/models/field.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;

  public isEditing: boolean= false;
  public isLoading: boolean= false;

  constructor() { 

    this.profileForm= new FormGroup({});
    this.profileForm.addControl("firstName", new FormControl("Arthur Morais",[Validators.required]));
    this.profileForm.addControl("secondName", new FormControl("Pimentel",[Validators.required]));
    this.profileForm.addControl("email", new FormControl("guaxininanonimo@gmail.com",[Validators.required, Validators.email]));
    this.profileForm.addControl("phone", new FormControl("(31)99999-9999",[Validators.required]));
    this.profileForm.disable();

  }

  ngOnInit(): void {
  }

  
  public get profileFormFields() : Field[] {
    return [{
      type: "text",
      label: "Nome",
      errors: {
        "required": "O campo é obrigatório"
      }
    },
    {
      type: "text",
      label: "Sobrenome",
      errors: {
        "required": "O campo é obrigatório"
      }
    },
    {
      type: "text",
      label: "Email",
      errors: {
        "required": "O campo é obrigatório",
        "email": "Formato incorreto"
      }
    },
    {
      type: "text",
      label: "Telefone",
      errors: {
        "required": "O campo é obrigatório"
      }
    }
    ]
  }

  public update(){
    
    this.isEditing=true;
    this.profileForm.enable();
  }

  public cancel(){
    this.isEditing=false;
    this.profileForm.disable();
  }

  //Methods to use only in tha HTML
  public getFormControl(field: string){
    return this.profileForm.get(field) as FormControl
  }

}
