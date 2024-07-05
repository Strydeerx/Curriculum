import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
})
export class HistorialComponent  implements OnInit {
  isMenuVisible = false;
  
  constructor() { }
  datos= [];
  ngOnInit() {}
  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
}
