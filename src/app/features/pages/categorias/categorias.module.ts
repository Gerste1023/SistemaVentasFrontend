import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { SharedModule } from '../../../shared/shared.module';

import { CategoriasComponent } from './categorias.component';
import { ListCategoriasComponent } from './list-categorias/list-categorias.component';
import { ObjCategoriasComponent } from './obj-categorias/obj-categorias.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CategoriasComponent,
    ListCategoriasComponent,
    ObjCategoriasComponent,
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    CategoriasComponent
  ]
})
export class CategoriasModule { }
