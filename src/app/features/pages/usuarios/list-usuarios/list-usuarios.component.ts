import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmarComponent } from 'src/app/features/components/confirmar/confirmar.component';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrls: ['./list-usuarios.component.css']
})
export class ListUsuariosComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'us_identificacion',
    'us_nombres',
    'us_apellidos',
    'us_telefono',
    'us_email',
    'us_direccion',
    'us_tipoUsuario',
    'actions',
  ];

  dataSource!: MatTableDataSource<any>;

  constructor( private _router: Router,
               private _dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.cargarUsuario();
  }

  editarUsuario( index: number ): void {

    this._router.navigate(['/usuarios/editar',index]);

  }

  eliminarUsuario( index: number ): void {

    const dialog = this._dialog.open( ConfirmarComponent, {
      width: '250px'
    } );

    dialog.afterClosed().subscribe( result => {
      if ( result ) {

      //borrar usuario con el servicio y despues cargar el contenido
      }
    });
    
  }

  cargarUsuario() {
    this.dataSource = new MatTableDataSource( [
      {
        id: 1,
        us_identificacion: '1047431683',
        us_nombres: 'RAFAEL ANTONIO',
        us_apellidos: 'CARRILLO PAYARES',
        us_telefono: '3014779078',
        us_email: 'COMERCIAL@K-IROS.COM',
        us_direccion: 'OLAYA SECTOR LAS AMERICAS CLL47 N? 85B15',
        us_tipoUsuario: 'ADMIN',
        actions: '',
      },
    ] );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
