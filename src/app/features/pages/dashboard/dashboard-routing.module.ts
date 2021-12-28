import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

import { ClientesComponent } from '../clientes/clientes.component';
import { ProductosComponent } from '../productos/productos.component';
import { ProveedoresComponent } from '../proveedores/proveedores.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { VentasComponent } from '../ventas/ventas.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [

      {
        path: 'clientes', component: ClientesComponent
      },
      {
        path: 'productos', component: ProductosComponent
      },
      {
        path: 'proveedores', component: ProveedoresComponent
      },
      {
        path: 'usuarios', component: UsuariosComponent
      },
      {
        path: 'ventas', component: VentasComponent
      },
      {
        path: '**', redirectTo: 'categorias'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
