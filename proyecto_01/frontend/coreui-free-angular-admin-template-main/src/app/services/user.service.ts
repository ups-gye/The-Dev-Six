import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {User} from "../models/User";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url_rest: string;

  constructor(private http: HttpClient) {
    this.url_rest = environment.url_rest
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.url_rest}auth/adduser`, user);
  }

  login(user:User):Observable<any>{
    return this.http.post<any>(`${this.url_rest}auth/login`, user);
  }

}
