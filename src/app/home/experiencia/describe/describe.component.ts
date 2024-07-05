import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { IDescribe } from './IDescribe';


@Component({
  selector: 'app-describe',
  templateUrl: './describe.component.html',
  styleUrls: ['./describe.component.scss'],
})
export class DescribeComponent  implements OnInit {
  loginForm = new FormGroup({
    //iddescripcion: new FormControl(),
    descripcion: new FormControl ('123')
  });
  
 // iddescripcion:number = this.loginForm.controls.iddescripcion.value;
  descripcion: string = this.loginForm.controls.descripcion.value +'';

  describe: IDescribe ={
    //iddescripcion: this.iddescripcion,
    descripcion: this.descripcion
  }
  isMenuVisible = false;
  goBack() {
    // Lógica para regresar
    console.log('Regresar');
  }
 
  continueNext() {
    // Lógica para continuar
    console.log('Continuar');
  }

  addText(text: string) {
    const textarea = <HTMLTextAreaElement>document.getElementById('workDescription');
    textarea.value += text + "\n";
  }

  constructor(private apiService: ApiService) { }
  recuperaformulariodescribe(){
   // this.iddescripcion =  this.loginForm.controls.iddescripcion.value;
    this.descripcion = this.loginForm.controls.descripcion.value + '';
    this.describe = {
     // iddescripcion: this.iddescripcion,
      descripcion: this.descripcion
    }
    console.log(this.describe);
    this.insertardatosdesc();
  }
  Obtenerdatosdesc(){
    this.apiService.getDescribe().subscribe((data) => {
      console.log(data);
    });
  }
  insertardatosdesc(){
    this.apiService.insertDescribe(this.describe).subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit() {}
  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
}
