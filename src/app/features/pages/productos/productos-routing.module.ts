import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos.component';
import { ListProductosComponent } from './list-productos/list-productos.component';
import { ObjProductosComponent } from './obj-productos/obj-productos.component';

const routes: Routes = [
  { 
    path: '', 
    component: ProductosComponent, 
    children:[
      { path: '', component: ListProductosComponent },
      { path: 'agregar', component: ObjProductosComponent },
      { path: 'editar/:id', component: ObjProductosComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
