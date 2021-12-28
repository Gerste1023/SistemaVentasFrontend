import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductosComponent } from './productos.component';
import { ListProductosComponent } from './list-productos/list-productos.component';
import { ObjProductosComponent } from './obj-productos/obj-productos.component';

import { ProductosRoutingModule } from './productos-routing.module';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    ProductosComponent,
    ListProductosComponent,
    ObjProductosComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ProductosModule { }
