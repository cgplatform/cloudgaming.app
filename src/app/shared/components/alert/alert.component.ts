import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 's2p-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input()
  public title:string= "";

  @Input()
  public type: string="alerta"

  

  constructor() { }

  ngOnInit(): void {
  }

  getClass(){
    
  }

}
