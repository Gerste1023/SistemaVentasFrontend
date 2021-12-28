import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { UsuariosComponent } from './usuarios.component';
import { ListUsuariosComponent } from './list-usuarios/list-usuarios.component';
import { ObjUsuariosComponent } from './obj-usuarios/obj-usuarios.component';


@NgModule({
  declarations: [
    UsuariosComponent,
    ListUsuariosComponent,
    ObjUsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class UsuariosModule { }
