import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Diamond } from '../models/diamond';

@Injectable({
  providedIn: 'root'
})
export class DiamondsService {

  constructor(private http: HttpClient) { }

  getDiamonds() : Observable<any> {
    return this.http.get("https://localhost:44396/api/diamonds");
  }

  public addDiamond(diamond : Diamond):Observable<Diamond> {
    return this.http.post<Diamond>("https://localhost:44396/api/diamonds",diamond);
  }

  
}
