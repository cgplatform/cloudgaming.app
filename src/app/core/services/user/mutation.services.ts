import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { config } from "app.config";

import * as gql from "gql-query-builder";

import { User } from "../../models/user.model";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class UserMutationService {
    private host = `${config.api.host}/user`;

    constructor(private http: HttpClient) {}

    public create(user: User, fields: string[]): Observable<any> {
        const query = gql.mutation({
            operation: "create",
            variables: {
                name: {
                    value: user.name,
                    required: true
                },
                password: {
                    value: user.password,
                    required: true
                },
                birthdate: {
                    value: user.birthdate,
                    required: true
                },
                phone: {
                    value: user.phone,
                    required: true
                },
                email: {
                    value: user.email,
                    required: true
                }
            },
            fields: fields
        });

        return this.http.post(this.host, query);
    }

    public delete(password: any): Observable<any> {
        const query = gql.mutation({
            operation: "delete",
            variables: {
                password: {
                    value: password,
                    required: true
                }
            },
            fields: ["id", "deletedCount"]
        });

        return this.http.post(this.host, query);
    }

    public updateBy(variables: any, fields: string[]): Observable<any> {
        const query = gql.mutation({
            operation: "delete",
            variables: variables,
            fields: fields
        });

        return this.http.post(this.host, query);
    }


    public resetPassword(password: string, token: string, fields: string[]): Observable<any> {
        const query = gql.mutation({
            operation: "reset_password",
            variables: {
                password: {
                    value: password,
                    required: true
                },
                token: {
                    value: token,
                    required: true
                }
            },
            fields: [fields]
        });

        return this.http.post(this.host, query);
    }
}
