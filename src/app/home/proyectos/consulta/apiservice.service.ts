import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Insercion {
  nombreproyecto: string;
  idempresa: number;
  fecha_inicio: Date;
  idlider: number;
  integrantesproyecto: string;
  descripcion: string;
}

export interface Empresa {
  idempresa: number;
  nombreempresa: string;
}

export interface Personal {
  idpersona: number;
  nombre: string;
  apellidop: string;
  apellidom: string;
}

export interface NombreProyecto {
  nombreproyecto: string;
}

export interface Proyecto {
  idproyecto: number;
  nombreproyecto: string;
  idempresa: number;
  fecha_inicio: string;
  idlider: number;
  integrantesproyecto: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  urlapi: string = environment.url;

  constructor(private http: HttpClient) { }

  altaproyect(datosProyecto: Insercion): Observable<any> {
    return this.http.post(this.urlapi + '/proyectos', datosProyecto);
  }

  sesion(correo: string, contrasena: string): Observable<any> {
    return this.http.get(this.urlapi + "/sesion/" + correo + '/' + contrasena);
  }

  getEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.urlapi + '/empresas');
  }

  getPersonales(): Observable<Personal[]> {
    return this.http.get<Personal[]>(this.urlapi + '/datospersonales');
  }

  getNombreProyectos(): Observable<NombreProyecto[]> {
    return this.http.get<{ok: boolean, status: number, data: NombreProyecto[], message: string}>(`${this.urlapi}/nombreproyectos`)
      .pipe(
        map((response: {ok: boolean, status: number, data: NombreProyecto[], message: string}) => response.data)
      );
  }

  getProyectoDetalles(nombreproyecto: string): Observable<Proyecto> {
    return this.http.get<Proyecto>(`${this.urlapi}/proyectos?nombre=${nombreproyecto}`);
  }

  getProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(`${this.urlapi}/proyectos`);
  }
  deleteProyecto(idproyecto: number): Observable<any> {
    return this.http.delete<any>(`${this.urlapi}/proyectos/${idproyecto}`);
  }
  updateProject(id: number, projectData: any): Observable<any> {
    return this.http.put(`${this.urlapi}/proyectos/${id}`, projectData);
  }
}
