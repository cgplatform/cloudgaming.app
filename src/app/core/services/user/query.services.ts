import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { config } from "app.config";

import * as gql from "gql-query-builder";

@Injectable({
    providedIn: "root"
})
export class UserQueryService {
    private host = `${config.api.host}/user`;

    constructor(private http: HttpClient) {}

    public login(email: string, password: string): Observable<any> {
        const query = gql.query({
            operation: "login",
            variables: {
                email: {
                    value: email,
                    required: true
                },
                password: {
                    value: password,
                    required: true
                }
            },
            fields: ["token"]
        });

        return this.http.post(this.host, query);
    }
}
