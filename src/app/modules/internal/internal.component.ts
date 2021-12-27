import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-internal",
    templateUrl: "./internal.component.html",
    styleUrls: ["./internal.component.scss"]
})
export class InternalComponent implements OnInit {
    public arrayCards: string[] = [
        "../../../../assets/images/cards/mk.png",
        "../../../../assets/images/cards/mk.png",
        "../../../../assets/images/cards/mk.png"
    ];

  public loading: boolean= true;

  constructor() { }

  ngOnInit(): void {
  }

  clickIcone(content:any){
    console.log(content)
    console.log('capturei o click')
  }

  clickText(content:any){
    console.log(content)
    console.log('capturei o click')
  }
}
