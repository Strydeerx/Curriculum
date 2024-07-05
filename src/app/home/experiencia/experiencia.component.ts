import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ICargo } from './ICargo';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.scss'],
})
export class ExperienciaComponent  implements OnInit {
  
  loginForm= new FormGroup({
    idcargo: new FormControl(),
    puesto: new FormControl(),
    empresa: new FormControl(),
    ciudad: new FormControl(),
    alcaldia: new FormControl(),
    fechainicial: new FormControl(),
    fechafinal: new FormControl(),
    empleoactual: new FormControl(),
    //logo: new FormControl()
  });

  idcargo: number = parseInt( this.loginForm.controls.idcargo.value + '', 10 );
  puesto: string = this.loginForm.controls.puesto.value + '';
  empresa: string = this.loginForm.controls.empresa.value + '';
  ciudad: string = this.loginForm.controls.ciudad.value + '';
  alcaldia: string = this.loginForm.controls.alcaldia.value + '';
  fechainicial: Date = new Date (this.loginForm.controls.fechafinal.value + ''); // Inicializando con la fecha actual
  fechafinal: Date = new Date (this.loginForm.controls.fechafinal.value + '');   // Inicializando con la fecha actual
  empleoactual: boolean = Boolean (this.loginForm.controls.empleoactual.value + '');// Valor predeterminado para boolean
  //logo: Blob = new Blob([JSON.stringify(this.loginForm.controls.logo.value)], { type: 'application/json' });       // Inicializando con un Blob vacío
  
  cargo: ICargo={
    idcargo: this.idcargo,
    puesto: this.puesto,
    empresa: this.empresa,
    ciudad: this.ciudad,
    alcaldia: this.alcaldia,
    fechainicial: this.fechainicial,
    fechafinal: this.fechafinal,
    empleoactual: this.empleoactual
    //logo: undefined
  }
  /*cargo: ICargo={
    idcargo: 2,
    puesto: 'analista',
    empresa: 'tesco',
    ciudad: 'mexico',
    alcaldia: 'venustiano',
    fechainicial: new Date('2022-01-01'), // Fecha inicial como objeto `Date`
    fechafinal: new Date('2023-01-01'),   // Fecha final como objeto `Date`
    empleoactual: false,
    logo: new Blob([''], { type: 'image/png' })
  }*/
  logoUrl: string | ArrayBuffer | null = null;
  isMenuVisible = false;
  areTipsVisible = false;
  
  constructor(private router: Router, private apiService: ApiService) { }
 recuperaformulariocargo(){
  this.idcargo =  parseInt( this.loginForm.controls.idcargo.value + '', 10);
  this.puesto = this.loginForm.controls.puesto.value + '';
  this.empresa = this.loginForm.controls.empresa.value + '';
  this.ciudad = this.loginForm.controls.ciudad.value + '';
  this.alcaldia = this.loginForm.controls.alcaldia.value + '';
  this.fechainicial = new Date (this.loginForm.controls.fechafinal.value + ''); 
  this.fechafinal = new Date (this.loginForm.controls.fechafinal.value + '');   
  this.empleoactual = Boolean (this.loginForm.controls.empleoactual.value + '');   
  //this.logo = this.loginForm.controls.logo.value;
  console.log(this.loginForm.value);
  this.cargo = {
    idcargo: this.idcargo,
    puesto: this.puesto,
    empresa: this.empresa,
    ciudad: this.ciudad,
    alcaldia: this.alcaldia,
    fechainicial: this.fechainicial, 
    fechafinal: this.fechafinal,   
    empleoactual: this.empleoactual,
    //logo: this.logo
  }     
    console.log(this.cargo);
    this.Insertardatoscar();
    //this.Obtenerdatoscar();
 }

  Obtenerdatoscar(){
    this.apiService.getCargo().subscribe(data => {
      console.log(data);
    });
  }
  Insertardatoscar(){
    this.apiService.insertCargo(this.cargo).subscribe(data => {
      console.log("Datos insertados");
    });
  }
    onLogoSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.logoUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  ngOnInit() {}
  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
  showTips() {
    this.areTipsVisible = true;
  }
  hideTips() {
    this.areTipsVisible = false;
  }  
  navigateToDescribe() {
    this.router.navigate(['home/exper/describe']);
  }
}
function stringToBoolean(arg0: string): boolean {
  throw new Error('Function not implemented.');
}

