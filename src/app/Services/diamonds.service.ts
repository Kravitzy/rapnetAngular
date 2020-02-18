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
    // var list = this.http.get("https://localhost:44396/api/diamonds");
    return this.http.get("https://localhost:44396/api/diamonds");
  }
  
}
