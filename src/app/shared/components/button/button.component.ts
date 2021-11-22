import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input()
  public isLoading:boolean=false;

  @Input()
  public type: string="blue"

  @Input()
  public color: string="blue"

  @Input()
  public imgPath: string="../../../../assets/images/cards/engrenagem.png";

  constructor() { 
  
  }

  ngOnInit(): void {
  }


  click(){
    console.log('clicado');
  }

  getClass(){
    let bah="";
    if(this.type=="portrait"){
      bah="border"
    }
    return [this.type,bah,this.color]
  }

}
