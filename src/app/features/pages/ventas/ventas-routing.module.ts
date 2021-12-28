import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasComponent } from './ventas.component';
import { ListVentasComponent } from './list-ventas/list-ventas.component';
import { ObjVentasComponent } from './obj-ventas/obj-ventas.component';

const routes: Routes = [
  { 
    path: '', 
    component: VentasComponent, 
    children:[
      { path: '', component: ListVentasComponent },
      { path: 'agregar', component: ObjVentasComponent },
      { path: 'editar/:id', component: ObjVentasComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
