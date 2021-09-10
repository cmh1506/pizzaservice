import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, of} from "rxjs";

import {Item} from "./item";
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }
  getItemList(): Observable<Item[]> {
    return this.http.get<Item[]>(environment.apiURL + "items");
  }
}
