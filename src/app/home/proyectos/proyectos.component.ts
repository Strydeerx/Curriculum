import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService, Empresa, Personal } from './apiservice.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit {
  login: FormGroup;
  empresas: Empresa[] = [];
  personales: Personal[] = [];
  errors = [
    { type: 'required', message: 'Campo Requerido' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiserviceService
  ) {
    this.login = this.formBuilder.group({
      name: ['', Validators.required],
      empresa: ['', Validators.required],
      fecha: ['', Validators.required],
      lider: ['', Validators.required],
      integrante1: ['', Validators.required],
      integrante2: ['', Validators.required],
      integrante3: ['', Validators.required],
      desc: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.apiService.getEmpresas().subscribe((data: Empresa[]) => {
      this.empresas = data;
    });

    this.apiService.getPersonales().subscribe((data: Personal[]) => {
      this.personales = data;
    });
  }

  submitForm(): void {
    if (this.login.valid) {
      const datosProyecto = {
        nombreproyecto: this.login.value.name,
        idempresa: this.login.value.empresa,
        fecha_inicio: this.login.value.fecha,
        idlider: this.login.value.lider,
        integrantesproyecto: `${this.login.value.integrante1}, ${this.login.value.integrante2}, ${this.login.value.integrante3}`,
        descripcion: this.login.value.desc
      };
      this.apiService.altaproyect(datosProyecto).subscribe(response => {
        console.log('Proyecto creado:', response);
      });
    }
  }
}
