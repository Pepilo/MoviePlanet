import { Observable } from "rxjs";
import { environment } from "../../environments/environments";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class UsersService {

    constructor( private http: HttpClient) {}

    private readonly apiUrl = environment.apiUrl;

    createUser(userDatas: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/register`, userDatas);
    }
}