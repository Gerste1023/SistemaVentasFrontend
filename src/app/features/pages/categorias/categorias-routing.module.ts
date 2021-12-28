import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias.component';
import { ListCategoriasComponent } from './list-categorias/list-categorias.component';
import { ObjCategoriasComponent } from './obj-categorias/obj-categorias.component';

const routes: Routes = [  
  { 
    path: '', 
    component: CategoriasComponent, 
    children:[
      { path: '', component: ListCategoriasComponent },
      { path: 'agregar', component: ObjCategoriasComponent },
      { path: 'editar/:id', component: ObjCategoriasComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
