import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { VentasComponent } from './ventas.component';
import { ListVentasComponent } from './list-ventas/list-ventas.component';
import { ObjVentasComponent } from './obj-ventas/obj-ventas.component';


@NgModule({
  declarations: [
    VentasComponent,
    ListVentasComponent,
    ObjVentasComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule
  ]
})
export class VentasModule { }
