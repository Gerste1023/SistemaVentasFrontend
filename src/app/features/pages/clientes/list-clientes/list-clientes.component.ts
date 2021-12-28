import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { ConfirmarComponent } from 'src/app/features/components/confirmar/confirmar.component';

@Component({
  selector: 'app-list-clientes',
  templateUrl: './list-clientes.component.html',
  styleUrls: ['./list-clientes.component.css']
})
export class ListClientesComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'cl_rut',
    'cl_nombre',
    'cl_telefono',
    'cl_email',
    'cl_ciudad',
    'cl_observacion',
    'actions',
  ];

  dataSource!: MatTableDataSource<any>;

  constructor( private _router: Router,
               private _dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  editarCliente( index: number ): void {

    this._router.navigate(['/clientes/editar',index]);

  }
    
  eliminarCliente( index: number ): void {

    const dialog = this._dialog.open( ConfirmarComponent, {
      width: '250px'
    } );

    dialog.afterClosed().subscribe( result => {
      if ( result ) {
        
        //borrar cliente con el servicio y despues cargar el contenido
      }
    });
/*     this._instrumentoService.eliminarInstrumento(index);
    this.cargarInstrumentos(); */
  }
  
  cargarCliente() {
    this.dataSource = new MatTableDataSource( [
      {
        id: 1,
        cl_rut: '12345',
        cl_nombre: 'JAIDER CASTELLON',
        cl_telefono: '320789789',
        cl_email: 'JAIDER@JAIDER.COM',
        cl_ciudad: 'POR HAY',
        cl_observacion: 'ESTE MAN ESTA BIEN LOCO, OJO CON ESO',
      },
      {
        id: 2,
        cl_rut: '12345',
        cl_nombre: 'JAIDER CASTELLON',
        cl_telefono: '320789789',
        cl_email: 'JAIDER@JAIDER.COM',
        cl_ciudad: 'POR HAY',
        cl_observacion: 'ESTE MAN ESTA BIEN LOCO, OJO CON ESO',
      },
      {
        id: 3,
        cl_rut: '12345',
        cl_nombre: 'JAIDER CASTELLON',
        cl_telefono: '320789789',
        cl_email: 'JAIDER@JAIDER.COM',
        cl_ciudad: 'POR HAY',
        cl_observacion: 'ESTE MAN ESTA BIEN LOCO, OJO CON ESO',
      },
      {
        id: 4,
        cl_rut: '12345',
        cl_nombre: 'JAIDER CASTELLON',
        cl_telefono: '320789789',
        cl_email: 'JAIDER@JAIDER.COM',
        cl_ciudad: 'POR HAY',
        cl_observacion: 'ESTE MAN ESTA BIEN LOCO, OJO CON ESO',
      },
      {
        id: 5,
        cl_rut: '12345',
        cl_nombre: 'JAIDER CASTELLON',
        cl_telefono: '320789789',
        cl_email: 'JAIDER@JAIDER.COM',
        cl_ciudad: 'POR HAY',
        cl_observacion: 'ESTE MAN ESTA BIEN LOCO, OJO CON ESO',
      },
      
    
    ] );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
