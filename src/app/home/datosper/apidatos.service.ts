import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { intdatos } from './datosper.interface';

@Injectable({
  providedIn: 'root'
})
export class ApidatosService {
  urlapi: string = environment.url
  constructor(private http: HttpClient) { }
  obtener(): Observable<any>{
    return this.http.get(this.urlapi + 'datosp/consulta');
  }
  obtenerid(id: string): Observable<any>{
    return this.http.get(this.urlapi + 'datosp/consulta/' + id);
  }
  agregar(datos: intdatos): Observable<any>{
    return this.http.post(this.urlapi + 'datosp/agregar', datos);
  }
  editar(id: string, datos:intdatos): Observable<any>{
    return this.http.put(this.urlapi + 'datosp/editar/' + id, datos);
  }
  eliminar(id: string): Observable<any>{
    return this.http.delete(this.urlapi + 'datosp/eliminar/' + id);
  }
}