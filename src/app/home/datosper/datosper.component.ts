import { Component } from '@angular/core';
import { FormGroup,FormBuilder,FormControl } from '@angular/forms';
import { ApidatosService } from './apidatos.service';
import { intdatos } from './datosper.interface';

@Component({
  selector: 'app-datosper',
  templateUrl: './datosper.component.html',
  styleUrls: ['./datosper.component.scss'],
})
export class DatosperComponent   {

  loginForm = new FormGroup({
    idpersona: new FormControl(''),
    nombre: new FormControl(''),
    apellidop: new FormControl(''),
    apellidom: new FormControl(''),
    correo: new FormControl(''),
    telefono: new FormControl(''),
    idgenero: new FormControl(''),
    idestado: new FormControl(''),
    idpais: new FormControl(''),
  });

  constructor(private api: ApidatosService) { }
    
    recuperarFormulario():intdatos{
      const formValues = this.loginForm.value;
      const user: intdatos = {
        idpersona: formValues.idpersona!,
        nombre: formValues.nombre!,
        apellidop: formValues.apellidop!,
        apellidom: formValues.apellidom!,
        correo: formValues.correo!,
        telefono: formValues.telefono!,
        idgenero: formValues.idgenero!,
        idestado: formValues.idestado!,
        idpais: formValues.idpais!,
      };
      return user;
    }

    obtener(){
      this.api.obtener().subscribe(data => {
        console.log(data);
      });
    }
    obtenerid(){
      const id = this.loginForm.value.idpersona;
      if (id){
        console.log(`Consultando datos por id: ${id}`);
        this.api.obtenerid(id).subscribe(data => {
          if (data && data.body){
            const dato = data.body;
            this.loginForm.patchValue({
              nombre: dato.nombre || ''
            });
            console.log('datos consultados:', dato);
          } else {
            console.log('No se encontraron datos por id', id);
          }

        }, error => {
          console.error('Error al consultar por ID:', error);
        });
      } else {
        console.warn('ID vacío, por favor ingresa un ID válido.');
      }
    }
    agregar(){
      const user = this.recuperarFormulario();
      this.api.agregar(user).subscribe(data => {
        console.log('datos agregado:', data);
      }, error => {
        console.error('Error al agregar usuario:', error);
      });
    }
    editar(){
      const id = this.loginForm.value.idpersona;
      const user = this.recuperarFormulario();
      if (id){
      this.api.editar(id,user).subscribe(data => {
        console.log('datos actualizados:', data);
        this.loginForm.patchValue({ nombre:''});
        this.obtener();
      }, error => {
        console.error('Error al editar datos:', error);
      });
    } else {
      console.warn('ID vacío, por favor ingresa un ID válido.');
    }
  }
  eliminar(){
    const id = this.loginForm.value.idpersona;
    if (id){
      this.api.eliminar(id).subscribe(data => {
        console.log('datos eliminados:', data);
        this.loginForm.patchValue({ nombre:''});
        this.obtener();
      }, error => {
        console.error('Error al eliminar datos:', error);
      });
    } else {
      console.warn('ID vacío, por favor ingresa un ID válido.');
    }
  }
}
