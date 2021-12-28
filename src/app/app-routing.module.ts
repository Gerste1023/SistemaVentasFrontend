import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './features/pages/auth/guards/auth.guard';
import { SidenavComponent } from './shared/sidenav/sidenav.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./features/pages/auth/auth.module').then( m => m.AuthModule ) },
  { path: '', component: SidenavComponent, children:[
    { path: 'categorias', loadChildren: () => import('./features/pages/categorias/categorias.module').then( m => m.CategoriasModule ), canLoad: [ AuthGuard ], canActivate: [ AuthGuard] },
    { path: 'clientes', loadChildren: () => import('./features/pages/clientes/clientes.module').then( m => m.ClientesModule ) },
    { path: 'productos', loadChildren: () => import('./features/pages/productos/productos.module').then( m => m.ProductosModule ) },
    { path: 'proveedores', loadChildren: () => import('./features/pages/proveedores/proveedores.module').then( m => m.ProveedoresModule ) },
    { path: 'usuarios', loadChildren: () => import('./features/pages/usuarios/usuarios.module').then( m => m.UsuariosModule ) },
    { path: 'ventas', loadChildren: () => import('./features/pages/ventas/ventas.module').then( m => m.VentasModule ) },
  ]},
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot( routes )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
