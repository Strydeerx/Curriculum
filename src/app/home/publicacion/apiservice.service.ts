import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { IntDatospersonales } from './datospersointerface';
import { IntPublicacion } from './publicacioninterface';
import { IntAutores } from './autoresinterface';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  getUsers() {
    throw new Error('Method not implemented.');
  }
 urlapi: string = environment.url
  constructor(private http:HttpClient) { }
  getdatospersonales(): Observable<IntDatospersonales[]>{
    return this.http.get<IntDatospersonales[]>(this.urlapi + 'Datospersonales/Consulta');
  }
  getpublicaciones(): Observable<IntPublicacion[]>{
    return this.http.get<IntPublicacion[]>(this.urlapi + 'Publicacion/Consulta');
  }
  

  insertpublicacion(publicacion:IntPublicacion): Observable<any>{
    return this.http.post(this.urlapi + 'Publicacion/Insertar', publicacion);
  }

  insertautores(autor:IntAutores): Observable<any>{
    return this.http.post(this.urlapi + 'Autor/Insertar', autor);
  }
}
