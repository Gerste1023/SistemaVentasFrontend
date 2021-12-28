import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProveedoresComponent } from './proveedores.component';
import { ListProveedoresComponent } from './list-proveedores/list-proveedores.component';
import { ObjProveedoresComponent } from './obj-proveedores/obj-proveedores.component';


@NgModule({
  declarations: [
    ProveedoresComponent,
    ListProveedoresComponent,
    ObjProveedoresComponent
  ],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ProveedoresModule { }
