import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Hero} from "./hero";
import { environment } from "../../environments/environment";
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private messageService: MessageService, private http: HttpClient) {}
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(environment.apiURL + "heros", this.httpOptions);
  }

}
