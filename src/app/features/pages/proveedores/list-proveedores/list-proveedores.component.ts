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
    'prov_nit',
    'prov_nombre',
    'prov_direccion',
    'prov_telefono',
    'prov_email',
    'actions',
  ];

  dataSource!: MatTableDataSource<any>;

  constructor( private _router: Router,
               private _dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.cargarProveedor();
  }

  editarProveedor( index: number ): void {

    this._router.navigate(['/proveedores/editar',index]);

  }

  eliminarProveedor( index: number ): void {

    const dialog = this._dialog.open( ConfirmarComponent, {
      width: '250px'
    } );

    dialog.afterClosed().subscribe( result => {
      if ( result ) {

      //borrar proveedor con el servicio y despues cargar el contenido
      }
    });
    
  }

  cargarProveedor() {
    this.dataSource = new MatTableDataSource( [
      {
        id: 1,
        prov_nit:'901534393 - 1',
        prov_nombre:'K-IROS SOLUCIONES Y TECNOLOGIA S.A.S',
        prov_direccion:'OLAYA SECTOR LAS AMERICAS CLL47 N? 85B15',
        prov_telefono:'3014779078',
        prov_email:'INFO@K-IROS.COM',
      },
    ] );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
