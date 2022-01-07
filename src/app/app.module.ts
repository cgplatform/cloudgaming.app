import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./shared/components/components.module";
import { HttpInterceptorService } from "./core/interceptors/http.interceptor";

@NgModule({
    declarations: [AppComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        }
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ComponentsModule,
        HttpClientModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
