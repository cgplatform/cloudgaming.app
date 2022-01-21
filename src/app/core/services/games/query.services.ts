import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { config } from "app.config";

import * as gql from "gql-query-builder";

@Injectable({
    providedIn: "root"
})
export class GamesQueryService {
    private host = `${config.api.host}/game`;

    constructor(private http: HttpClient) {}

    public filterBy(variables: any, fields: string[]): Observable<any> {
        const query = gql.query({
            operation: "filterByGame",
            variables: variables,
            fields: fields
        });

        return this.http.post(this.host, query);
    }

    
}
