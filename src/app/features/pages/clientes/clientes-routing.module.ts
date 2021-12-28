import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes.component';
import { ListClientesComponent } from './list-clientes/list-clientes.component';
import { ObjClientesComponent } from './obj-clientes/obj-clientes.component';

const routes: Routes = [
  { 
    path: '', 
    component: ClientesComponent, 
    children:[
      { path: '', component: ListClientesComponent },
      { path: 'agregar', component: ObjClientesComponent },
      { path: 'editar/:id', component: ObjClientesComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
