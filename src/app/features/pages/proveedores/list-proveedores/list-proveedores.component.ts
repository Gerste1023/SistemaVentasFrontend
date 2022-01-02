import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmarComponent } from 'src/app/features/components/confirmar/confirmar.component';

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

  dataSource!: MatTableDataSource<any>;

  constructor( private _router: Router,
               private _dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.cargarProveedor();
  }

  cargarProveedor() {
    this.dataSource = new MatTableDataSource( [
      {
        id: 1,
        nit:'901534393 - 1',
        nombre:'K-IROS SOLUCIONES Y TECNOLOGIA S.A.S',
        direccion:'OLAYA SECTOR LAS AMERICAS CLL47 N? 85B15',
        telefono:'3014779078',
        email:'INFO@K-IROS.COM',
      },
    ] );
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

      //borrar proveedor con el servicio y despues cargar el contenido
      }
    });
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
