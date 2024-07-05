import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiserviceService } from './apiservice.service';
import { IntDatospersonales } from './datospersointerface';
import { IntPublicacion } from './publicacioninterface';
import { IntAutores } from './autoresinterface';


@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss'],
})
export class PublicacionComponent{
  loginForm1 = new FormGroup({
    id:new FormControl(),
    idpublicacion: new FormControl(),
    idpersona: new FormControl()
  });
  id:number = this.loginForm1.controls.id.value
  idpublicacion:number= this.loginForm1.controls.idpublicacion.value
  idpersona:number= this.loginForm1.controls.idpersona.value

  usuario:IntAutores={
    id:this.id,
    idpublicacion: this.idpublicacion,
    idpersona:this.idpersona
  }

  loginForm= new FormGroup({
    idproducto: new FormControl(),
    titulo: new FormControl(),
    editorial: new FormControl(),
    anio:new FormControl(),
    mes: new FormControl(),
    dia: new FormControl(),
    paginas: new FormControl(),
    url: new FormControl()
  });
  idproducto:number= this.loginForm.controls.idproducto.value //variables locales que se enviaran al servidor
  titulo:string= this.loginForm.controls.titulo.value
  editorial:string= this.loginForm.controls.editorial.value
  anio:number= this.loginForm.controls.anio.value
  mes:number= this.loginForm.controls.mes.value
  dia:number= this.loginForm.controls.dia.value
  paginas:string= this.loginForm.controls.paginas.value
  url:string= this.loginForm.controls.url.value
user: IntPublicacion= {
  idproducto: this.idproducto,
  titulo: this.titulo,
  editorial: this.editorial,
  anio: this.anio,
  mes: this.mes,
  dia: this.dia,
  paginas: this.paginas,
  url: this.url,
  idpublicacion: 0
}

consultadatos:IntDatospersonales[]=[];
showTable: boolean = false;

  constructor(private piservice:ApiserviceService) {}
  recuperaformulario(){
    this.idproducto = this.loginForm.controls.idproducto.value
    this.titulo = this.loginForm.controls.titulo.value
    this.editorial = this.loginForm.controls.editorial.value
    this.anio = this.loginForm.controls.anio.value
    this.mes = this.loginForm.controls.mes.value
    this.dia = this.loginForm.controls.dia.value
    this.paginas = this.loginForm.controls.paginas.value
    this.url = this.loginForm.controls.url.value
    this.user= {
      idproducto: this.idproducto,
      titulo: this.titulo,
      editorial: this.editorial,
      anio: this.anio,
      mes: this.mes,
      dia: this.dia,
      paginas: this.paginas,
      url: this.url,
      idpublicacion: 0     
    }

    console.log(this.user);
    this.insertpublicacion(this.user)
    this.piservice.getdatospersonales().subscribe(data => {
console.log(data);
    });
  }

  recuperaformulario1(){
    this.id = this.loginForm1.controls.id.value
    this.idpublicacion = this.loginForm1.controls.idpublicacion.value
    this.idpersona = this.loginForm1.controls.idpersona.value
    this.usuario= {
      id: this.id,
      idpublicacion: this.idpublicacion,
      idpersona: this.idpersona     
    }
    console.log(this.usuario);
this.insertautores(this.usuario)
  }



  insertautores(insertarautores:IntAutores){
    this.piservice.insertautores(insertarautores).subscribe (data => {
      console.log('datos insertados correctamente');
    });
  }
 
  insertpublicacion(insertarpublicacion:IntPublicacion){
    this.piservice.insertpublicacion(insertarpublicacion).subscribe (data => {
      console.log('datos insertados correctamente');
    });
  }
  onClick(){
    this.piservice.getdatospersonales().subscribe(data => {
      this.showTable = true;
      this.consultadatos = data 
      console.log(data);
    });
  }

  onClose() {
    this.showTable = false;
  }
  }
  

