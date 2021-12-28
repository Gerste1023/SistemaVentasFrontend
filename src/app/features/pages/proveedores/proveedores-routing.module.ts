import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedoresComponent } from './proveedores.component';
import { ListProveedoresComponent } from './list-proveedores/list-proveedores.component';
import { ObjProveedoresComponent } from './obj-proveedores/obj-proveedores.component';

const routes: Routes = [
  { 
    path: '', 
    component: ProveedoresComponent, 
    children:[
      { path: '', component: ListProveedoresComponent },
      { path: 'agregar', component: ObjProveedoresComponent },
      { path: 'editar/:id', component: ObjProveedoresComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedoresRoutingModule { }
