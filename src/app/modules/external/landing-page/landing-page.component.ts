import { Component, OnInit } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { ActivatedRoute } from "@angular/router";
import { UserQueryService } from "src/app/core/services/user/query.services";
import { ApiErrors } from "src/app/core/errors/api-errors.error";
import { SessionService } from "src/app/core/services/session.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: "app-landing-page",
    templateUrl: "./landing-page.component.html",
    styleUrls: ["./landing-page.component.scss"]
})
export class LandingPageComponent implements OnInit {
    public arrayCardsPortrait: { path: string; name: string }[] = [
        {
            path: "../../../../assets/images/cards/land.png",
            name: "Mortal Kombat 11"
        },
        {
            path: "../../../../assets/images/cards/wp24174-far-cry-5-wallpapers.png",
            name: "Devil May Cry 5"
        },
        {
            path: "../../../../assets/images/cards/anthem-2560x1600-e3-2018-gameplay-2019-games-4k-14316.png",
            name: "Anthem"
        },
        {
            path: "../../../../assets/images/cards/thumb-1920-920417.png",
            name: "Rage"
        },
        {
            path: "../../../../assets/images/cards/rockt1.png",
            name: "Rocket League"
        }
    ];

    public arrayCardsLandscape: { path: string; name: string }[] = [
        {
            path: "../../../../assets/images/cards/293972.png",
            name: "Cyberpunk 2077"
        },
        {
            path: "../../../../assets/images/cards/minecraft.png",
            name: "Minecraft"
        }
    ];

    constructor(private appComponent: AppComponent) {}

    ngOnInit(): void {}
}
