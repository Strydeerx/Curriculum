import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { MainComponent } from './main/main.component';
import { DatosacadComponent } from './datosacad/datosacad.component';
import { DatosperComponent } from './datosper/datosper.component';
import { ExperienciaComponent } from './experiencia/experiencia.component';
import { CertificaComponent } from './certifica/certifica.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { DescribeComponent } from './experiencia/describe/describe.component';
import { HistorialComponent } from './experiencia/historial/historial.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'datosaca',
    component: DatosacadComponent,
  },
  {
    path: 'datosper',
    component: DatosperComponent,
  },
  {
    path: 'exper',
    component: ExperienciaComponent,
   /* children: [ para paginas
      { path: 'describe', component: DescribeComponent },
      { path: 'historial', component: HistorialComponent }
    ]*/
  },
  {
    path: 'exper/historial',//componenetes
    component: HistorialComponent,
  },
  {
    path: 'exper/describe',//componenetes
    component: DescribeComponent,
  },
  {
    path: 'certif',
    component: CertificaComponent,
  },
  {
    path: 'proy',
    component: ProyectosComponent,
  },
  {
    path: 'public',
    component: PublicacionComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
