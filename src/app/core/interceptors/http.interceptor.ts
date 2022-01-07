import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";

import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { SessionService } from "../services/session.service";

@Injectable({
    providedIn: "root"
})
export class HttpInterceptorService implements HttpInterceptor {
    constructor(private sessionService: SessionService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        console.log("INTERCEPTOR");

        try {
            const user = this.sessionService.get();

            if (!request.headers.has("Token")) {
                request = request.clone({
                    headers: request.headers.set("Token", user.token!)
                });
            }
        } finally {
            return next.handle(request).pipe(
                tap((data: any) => {
                    if (data.body && data.body.errors) {
                        for (const error of data.body.errors) {
                            if (error.message == "not authorized") {
                                this.sessionService.destroy();
                            }
                        }
                    }
                }),
                catchError((fail: any) => {
                    if (fail.status === 401) {
                        this.sessionService.destroy();
                    }

                    return throwError(fail);
                })
            );
        }
    }
}
