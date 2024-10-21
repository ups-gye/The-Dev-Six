import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url: string;

  constructor(private http: HttpClient ) {
    this.url=environment.url
 }

 getProducts():Observable<any> {
  return this.http.get(`${this.url}/products`); // TODO FIX THIS ACCORD TO BACKEND
 }
}
