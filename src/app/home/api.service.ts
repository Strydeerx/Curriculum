import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ICargo } from './experiencia/ICargo';
import { IDescribe } from './experiencia/describe/IDescribe';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  getCargo(): Observable<any> {
    return this.http.get('http://localhost:3001/cargo/consulta/');
  }
  insertCargo(cargo: ICargo): Observable<any> {
    return this.http.post('http://localhost:3001/cargo/insertar/', cargo);
  }
  getDescribe(): Observable<any> {
    return this.http.get('http://localhost:3001/descripcioncargo/consulta');
  }
  insertDescribe(cargo: IDescribe): Observable<any> {
    return this.http.post('http://localhost:3001/descripcioncargo/insertar', cargo);
  }
}
