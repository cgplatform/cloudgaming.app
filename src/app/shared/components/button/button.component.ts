import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input()
  public isLoading:boolean=false;

  @Input()
  public prefix: string=""

  @Input()
  public color: string="blue"

  @Input()
  public posfix: string=""

  @Output()
  public icone: EventEmitter<{}>;

  @Output()
  public text: EventEmitter<{}>;

  constructor() { 
    this.icone = new EventEmitter();
    this.text = new EventEmitter();
  }

  ngOnInit(): void {
  }


  clickIcone(){
    this.icone.emit("Clicou no texto");
  }

  
  clickText(){
    this.text.emit("Clicou no icone");
  }


}
