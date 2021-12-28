import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { ListUsuariosComponent } from './list-usuarios/list-usuarios.component';
import { ObjUsuariosComponent } from './obj-usuarios/obj-usuarios.component';

const routes: Routes = [
  { 
    path: '', 
    component: UsuariosComponent, 
    children:[
      { path: '', component: ListUsuariosComponent },
      { path: 'agregar', component: ObjUsuariosComponent },
      { path: 'editar/:id', component: ObjUsuariosComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
