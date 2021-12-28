import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ClientesRoutingModule } from './clientes-routing.module';
import { SharedModule } from '../../../shared/shared.module';

import { ClientesComponent } from './clientes.component';
import { ListClientesComponent } from './list-clientes/list-clientes.component';
import { ObjClientesComponent } from './obj-clientes/obj-clientes.component';


@NgModule({
  declarations: [
    ClientesComponent,
    ListClientesComponent,
    ObjClientesComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    SharedModule,
    ReactiveFormsModule,

  ]
})
export class ClientesModule { }
