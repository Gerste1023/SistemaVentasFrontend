import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { ConfirmarComponent } from 'src/app/features/components/confirmar/confirmar.component';
import { Cliente } from '../../../../core/interfaces/cliente.interface';
import { ClienteService } from '../../../../core/services/cliente.service';

@Component({
  selector: 'app-list-clientes',
  templateUrl: './list-clientes.component.html',
  styleUrls: ['./list-clientes.component.css']
})
export class ListClientesComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'rut',
    'nombre',
    'telefono',
    'email',
    'ciudad',
    'observacion',
    'actions',
  ];

  dataSource!: MatTableDataSource<Cliente>;

  constructor( private _router: Router,
               private _dialog: MatDialog,
               private _snackBar: MatSnackBar,
               private _clienteService: ClienteService,
    ) { this.dataSource = new MatTableDataSource<Cliente>([]); }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente() {
    this._clienteService.getCliente().subscribe( clientes => { 
      this.dataSource.data = clientes
    });
  }

  editarCliente( index: number ): void {
    this._router.navigate(['/clientes/editar',index]);
  }
    
  eliminarCliente( index: number, data: string ): void {

    const dialog = this._dialog.open( ConfirmarComponent, {
      width: '250px',
      data
    } );

    dialog.afterClosed().subscribe( result => {
      if ( result ) {
        this._clienteService.borrarCliente(index.toString()).subscribe( resp => {
          this.mostrarSnackbar("El cliente fue eliminado con exito!");
          this.cargarCliente();
        }, err => {
          this.mostrarSnackbar(err.error.message);
      })
      }
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarSnackbar( mensaje: string ): void {
    this._snackBar.open( mensaje, 'Ok!', {
      duration: 3000
    });
  }

}
