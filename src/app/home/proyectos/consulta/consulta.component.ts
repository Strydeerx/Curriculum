/*
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService, Proyecto, Personal, Empresa } from '../consulta/apiservice.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss'],
})
export class ConsultaComponent implements OnInit {
  proyectos: Proyecto[] = [];
  empresas: Empresa[] = [];
  selectedProyecto: Proyecto | null = null;
  consultaForm: FormGroup;
  lideres: Personal[] = [];
  integrantes: Personal[] = [];
  personales: Personal[] = [];
  isEditMode: boolean = false;  // Estado del modo de edición
  errors = [
    { type: 'required', message: 'Campo Requerido' }
  ];

  constructor(private apiService: ApiserviceService, private fb: FormBuilder, private alertController: AlertController) {
    this.consultaForm = this.fb.group({
      nombreproyecto: ['', Validators.required],
      empresa: ['', Validators.required],
      fecha: ['', Validators.required],
      lider: ['', Validators.required],
      integrante1: ['', Validators.required],
      integrante2: ['', Validators.required],
      integrante3: ['', Validators.required],
      desc: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.cargarProyectos();
    this.cargarPersonales();
    this.cargarEmpresas();
  }

  cargarProyectos() {
    this.apiService.getProyectos().subscribe(
      (response: any) => {
        console.log('Proyectos cargados:', response);
        if (Array.isArray(response.data)) {
          this.proyectos = response.data;
        } else {
          console.error('Error: La respuesta de la API no es un array');
        }
      },
      (error) => {
        console.error('Error al cargar los proyectos', error);
      }
    );
  }

  cargarPersonales() {
    this.apiService.getPersonales().subscribe(
      (data: Personal[]) => {
        console.log('Personales cargados:', data);
        this.lideres = data;
        this.integrantes = data;
        this.personales = [...data];  // Combinando lideres e integrantes
      },
      (error) => {
        console.error('Error al cargar los personales', error);
      }
    );
  }

  cargarEmpresas() {
    this.apiService.getEmpresas().subscribe(
      (data: Empresa[]) => {
        console.log('Empresas cargadas:', data);
        this.empresas = data;
      },
      (error) => {
        console.error('Error al cargar las empresas', error);
      }
    );
  }
  onProyectoChange(event: any) {
    console.log('Aqui evento', event);
    const nombreProyecto = event.detail.value;
    console.log('Proyecto seleccionado:', nombreProyecto);
    this.selectedProyecto = this.proyectos.find(proyecto => proyecto.nombreproyecto === nombreProyecto) || null;
    if (this.selectedProyecto) {
      const integrantes = this.selectedProyecto.integrantesproyecto.split(',').map(id => parseInt(id.trim(), 10));
      console.log('Integrantes del proyecto:', integrantes);
      if (this.isEditMode) {
        this.consultaForm.patchValue({
          nombreproyecto: this.selectedProyecto.nombreproyecto,
          empresa: this.selectedProyecto.idempresa,
          fecha: this.selectedProyecto.fecha_inicio,
          desc: this.selectedProyecto.descripcion,
          lider: this.selectedProyecto.idlider,
          integrante1: integrantes[0],
          integrante2: integrantes[1],
          integrante3: integrantes[2],
        });
      } else {
        this.consultaForm.patchValue({
          empresa: this.getNombreEmpresa(this.selectedProyecto.idempresa),
          fecha: this.selectedProyecto.fecha_inicio,
          desc: this.selectedProyecto.descripcion,
          lider: this.getNombreCompleto(this.selectedProyecto.idlider),
          integrante1: this.getNombreCompleto(integrantes[0]),
          integrante2: this.getNombreCompleto(integrantes[1]),
          integrante3: this.getNombreCompleto(integrantes[2]),
        });
      }
      console.log('Formulario actualizado:', this.consultaForm.value);
    }
  }
  
  getNombreEmpresa(id: number): string {
    const empresa = this.empresas.find(empresa => empresa.idempresa === id);
    return empresa ? empresa.nombreempresa : '';
  }

  getNombreCompleto(id: number | null): string {
    if (id === null) return '';
    const persona = this.lideres.find(lider => lider.idpersona === id) || this.integrantes.find(integrante => integrante.idpersona === id);
    if (persona) {
      return `${persona.nombre} ${persona.apellidop} ${persona.apellidom}`;
    }
    return '';
  }

  async eliminarProyecto() {
    if (this.selectedProyecto) {
      const alert = await this.alertController.create({
        header: 'Confirmar eliminación',
        message: `¿Estás seguro de que deseas eliminar el proyecto ${this.selectedProyecto.nombreproyecto}?`,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Eliminación cancelada');
            }
          },
          {
            text: 'Eliminar',
            handler: () => {
              this.apiService.deleteProyecto(this.selectedProyecto!.idproyecto).subscribe(
                () => {
                  console.log(`Proyecto ${this.selectedProyecto!.nombreproyecto} eliminado`);
                  this.cargarProyectos(); // Recargar la lista de proyectos
                  this.consultaForm.reset(); // Resetear el formulario
                  this.selectedProyecto = null; // Resetear el proyecto seleccionado
                },
                (error) => {
                  console.error('Error al eliminar el proyecto', error);
                }
              );
            }
          }
        ]
      });

      await alert.present();
    } else {
      console.error('No hay proyecto seleccionado para eliminar');
    }
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  submitForm(): void {
    if (this.consultaForm.valid) {
      const identificador = {idproyecto: this.selectedProyecto!.idproyecto};
      const datosProyecto = {
          // Si es editar, se envía el ID del proyecto
        nombreproyecto: this.consultaForm.value.nombreproyecto,
        idempresa: this.consultaForm.value.empresa,
        fecha_inicio: this.consultaForm.value.fecha,
        idlider: this.consultaForm.value.lider,
        integrante1: this.consultaForm.value.integrante1,
        integrante2: this.consultaForm.value.integrante2,
        integrante3: this.consultaForm.value.integrante3,
        descripcion: this.consultaForm.value.desc
      }
      this.apiService.updateProject(identificador.idproyecto,datosProyecto).subscribe(response => {
        console.log('Proyecto Modificado:', response);
      });
    }
  }
}*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService, Proyecto, Personal, Empresa } from '../consulta/apiservice.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss'],
})
export class ConsultaComponent implements OnInit {
  proyectos: Proyecto[] = [];
  empresas: Empresa[] = [];
  selectedProyecto: Proyecto | null = null;
  consultaForm: FormGroup;
  lideres: Personal[] = [];
  integrantes: Personal[] = [];
  personales: Personal[] = [];
  isEditMode: boolean = false;  // Estado del modo de edición
  errors = [
    { type: 'required', message: 'Campo Requerido' }
  ];

  constructor(private apiService: ApiserviceService, private fb: FormBuilder, private alertController: AlertController) {
    this.consultaForm = this.fb.group({
      nombreproyecto: ['', Validators.required],
      empresa: ['', Validators.required],
      fecha: ['', Validators.required],
      lider: ['', Validators.required],
      integrante1: ['', Validators.required],
      integrante2: ['', Validators.required],
      integrante3: ['', Validators.required],
      desc: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.cargarProyectos();
    this.cargarPersonales();
    this.cargarEmpresas();
  }

  cargarProyectos() {
    this.apiService.getProyectos().subscribe(
      (response: any) => {
        console.log('Proyectos cargados:', response);
        if (Array.isArray(response.data)) {
          this.proyectos = response.data;
        } else {
          console.error('Error: La respuesta de la API no es un array');
        }
      },
      (error) => {
        console.error('Error al cargar los proyectos', error);
      }
    );
  }

  cargarPersonales() {
    this.apiService.getPersonales().subscribe(
      (data: Personal[]) => {
        console.log('Personales cargados:', data);
        this.lideres = data;
        this.integrantes = data;
        this.personales = [...data];  // Combinando lideres e integrantes
      },
      (error) => {
        console.error('Error al cargar los personales', error);
      }
    );
  }

  cargarEmpresas() {
    this.apiService.getEmpresas().subscribe(
      (data: Empresa[]) => {
        console.log('Empresas cargadas:', data);
        this.empresas = data;
      },
      (error) => {
        console.error('Error al cargar las empresas', error);
      }
    );
  }

  onProyectoChange(event: any) {
    console.log('Aqui evento', event);
    const nombreProyecto = event.detail.value;
    console.log('Proyecto seleccionado:', nombreProyecto);
    this.selectedProyecto = this.proyectos.find(proyecto => proyecto.nombreproyecto === nombreProyecto) || null;
    if (this.selectedProyecto) {
      const integrantes = this.selectedProyecto.integrantesproyecto.split(',').map(id => parseInt(id.trim(), 10));
      console.log('Integrantes del proyecto:', integrantes);
      if (this.isEditMode) {
        this.consultaForm.patchValue({
          nombreproyecto: this.selectedProyecto.nombreproyecto,
          empresa: this.selectedProyecto.idempresa,
          fecha: this.selectedProyecto.fecha_inicio,
          desc: this.selectedProyecto.descripcion,
          lider: this.selectedProyecto.idlider,
          integrante1: integrantes[0],
          integrante2: integrantes[1],
          integrante3: integrantes[2],
        });
      } else {
        this.consultaForm.patchValue({
          empresa: this.getNombreEmpresa(this.selectedProyecto.idempresa),
          fecha: this.selectedProyecto.fecha_inicio,
          desc: this.selectedProyecto.descripcion,
          lider: this.getNombreCompleto(this.selectedProyecto.idlider),
          integrante1: this.getNombreCompleto(integrantes[0]),
          integrante2: this.getNombreCompleto(integrantes[1]),
          integrante3: this.getNombreCompleto(integrantes[2]),
        });
      }
      console.log('Formulario actualizado:', this.consultaForm.value);
    }
  }

  getNombreEmpresa(id: number): string {
    const empresa = this.empresas.find(empresa => empresa.idempresa === id);
    return empresa ? empresa.nombreempresa : '';
  }

  getNombreCompleto(id: number | null): string {
    if (id === null) return '';
    const persona = this.lideres.find(lider => lider.idpersona === id) || this.integrantes.find(integrante => integrante.idpersona === id);
    if (persona) {
      return `${persona.nombre} ${persona.apellidop} ${persona.apellidom}`;
    }
    return '';
  }

  async eliminarProyecto() {
    if (this.selectedProyecto) {
      const alert = await this.alertController.create({
        header: 'Confirmar eliminación',
        message: `¿Estás seguro de que deseas eliminar el proyecto ${this.selectedProyecto.nombreproyecto}?`,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Eliminación cancelada');
            }
          },
          {
            text: 'Eliminar',
            handler: () => {
              this.apiService.deleteProyecto(this.selectedProyecto!.idproyecto).subscribe(
                () => {
                  console.log(`Proyecto ${this.selectedProyecto!.nombreproyecto} eliminado`);
                  this.cargarProyectos(); // Recargar la lista de proyectos
                  this.consultaForm.reset(); // Resetear el formulario
                  this.selectedProyecto = null; // Resetear el proyecto seleccionado
                },
                (error) => {
                  console.error('Error al eliminar el proyecto', error);
                }
              );
            }
          }
        ]
      });

      await alert.present();
    } else {
      console.error('No hay proyecto seleccionado para eliminar');
    }
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode && this.selectedProyecto) {
      this.onProyectoChange({ detail: { value: this.selectedProyecto.nombreproyecto } });
    }
  }

  submitForm(): void {
    if (this.consultaForm.valid) {
      const identificador = { idproyecto: this.selectedProyecto!.idproyecto };
      const datosProyecto = {
        nombreproyecto: this.consultaForm.value.nombreproyecto,
        idempresa: this.consultaForm.value.empresa,
        fecha_inicio: this.consultaForm.value.fecha,
        idlider: this.consultaForm.value.lider,
        integrante1: this.consultaForm.value.integrante1,
        integrante2: this.consultaForm.value.integrante2,
        integrante3: this.consultaForm.value.integrante3,
        descripcion: this.consultaForm.value.desc
      }
      this.apiService.updateProject(identificador.idproyecto, datosProyecto).subscribe(response => {
        console.log('Proyecto Modificado:', response);
      });
    }
  }
}


