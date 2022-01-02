import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmarComponent } from 'src/app/features/components/confirmar/confirmar.component';
import { ProveedorService } from '../../../../core/services/proveedor.service';
import { Proveedor } from '../../../../core/interfaces/proveedor.interface';

@Component({
  selector: 'app-list-proveedores',
  templateUrl: './list-proveedores.component.html',
  styleUrls: ['./list-proveedores.component.css']
})
export class ListProveedoresComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'nit',
    'nombre',
    'direccion',
    'telefono',
    'email',
    'actions',
  ];

  dataSource!: MatTableDataSource<Proveedor>;

  constructor( private _router: Router,
               private _dialog: MatDialog,
               private _snackBar: MatSnackBar,
               private _proveedorService: ProveedorService
  ) { this.dataSource = new MatTableDataSource<Proveedor>([]); }

  ngOnInit(): void {
    this.cargarProveedor();
  }

  cargarProveedor() {
    this._proveedorService.getProveedor().subscribe( proveedor => { 
      this.dataSource.data = proveedor
    });
  }

  editarProveedor( index: number ): void {
    this._router.navigate(['/proveedores/editar',index]);
  }

  eliminarProveedor( index: number, data: string ): void {
    const dialog = this._dialog.open( ConfirmarComponent, {
      width: '250px',
      data
    } );

    dialog.afterClosed().subscribe( result => {
      if ( result ) {
        this._proveedorService.borrarProveedor(index.toString()).subscribe( resp => {
          this.mostrarSnackbar("El proveedor fue eliminado con exito!");
          this.cargarProveedor();
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
