import { Component, OnInit } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { ActivatedRoute } from "@angular/router";
import { UserQueryService } from "src/app/core/services/user/query.services";
import { ApiErrors } from "src/app/core/errors/api-errors.error";
import { SessionService } from "src/app/core/services/session.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { GamesQueryService } from "src/app/core/services/games/query.services";
import { ModalController } from "src/app/shared/components/modal/models/modal-controller.model";

@Component({
    selector: "app-landing-page",
    templateUrl: "./landing-page.component.html",
    styleUrls: ["./landing-page.component.scss"]
})




export class LandingPageComponent  extends ModalController implements OnInit {

    public fpsGames: []= [];
    public hsGames: []= [];
    public hlGames: []= [];
    public hsPaths: {path:string, name:string}[]= [];
    public fpsPaths:{path:string, name:string}[]= [];
    public hlPaths:{path:string, name:string}[]= [];

    public currentGame: any;


    constructor(
        private appComponent: AppComponent,
        private gamesQueryService: GamesQueryService,
        private http: HttpClient) {

            super();

            this.getGames({
                highlight:{
                    value: true,
                    required: false
                }
            },this.hlPaths, this.hlGames, "poster");    

            this.getGames({
                category:{
                    value: "H&S",
                    required: false
                }
            }, this.hsPaths, this.hsGames, "banner");

            this.getGames({
                category:{
                    value: "FPS",
                    required: false
                }
            },this.fpsPaths, this.fpsGames, "banner");
        }

    ngOnInit(): void {}

    getGames(variables: any, arrayPath:{path:string,name:string}[], array: any[], orientation: string){
       
        const fields = ["id","name","description","platform","developer","category"]
        this.gamesQueryService.filterBy(variables,fields).subscribe((result:any)=>{
            if (result.errors) {
                for (const error of result.errors) {
                    if(error.message in ApiErrors){
                        this.appComponent.showMessage(ApiErrors[error.message],"warning");
                    }else{
                        this.appComponent.showMessage("Falha ao buscar jogos","error");
                    }
                }
                return;
            }
            const games = result.data.filterByGame;
            games.forEach((v:any)=>{
                    array.push({
                        game: v,
                        banner:  `https://cdn.start2play.games/${v.id}/banner.png`,
                        poster: `https://cdn.start2play.games/${v.id}/poster.png`,
                    })
                    arrayPath.push({path:`https://cdn.start2play.games/${v.id}/${orientation}.png`, name: v.name})
            })
            
        },(fail:HttpErrorResponse)=>{
            this.appComponent.showMessage("Falha ao buscar jogos", "error");
        })
        return;
    }

    cardEvent(event: any, gamesArray: any[]){
        this.currentGame = gamesArray[event];
        this.openModal("modalStartGame");
    }

}
