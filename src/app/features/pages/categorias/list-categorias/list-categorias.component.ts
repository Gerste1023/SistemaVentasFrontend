import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmarComponent } from '../../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-list-categorias',
  templateUrl: './list-categorias.component.html',
  styleUrls: ['./list-categorias.component.css']
})
export class ListCategoriasComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'car_nombre',
    'car_descripcion',
    'actions',
  ];

  dataSource!: MatTableDataSource<any>;

  constructor( private _router: Router,
               private _dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  editarCategoria( index: number ): void {

    this._router.navigate(['/categorias/editar',index]);


    /*     // console.log(this._instrumentoService.editarInstrumento(index));
        this.editarUnInstrumento = this._instrumentoService.editarInstrumento(index);
        this.router.navigate(['/instrumentos/editar',index]);
        // this.iraAgregar(); */
  }
  eliminarCategoria( index: number ): void {

    const dialog = this._dialog.open( ConfirmarComponent, {
      width: '250px'
    } );

    dialog.afterClosed().subscribe( result => {
      if ( result ) {
        
        //borrar categoria con el servicio y despues cargar el contenido
      }
    });
/*     this._instrumentoService.eliminarInstrumento(index);
    this.cargarInstrumentos(); */
  }

  cargarCategorias() {
    this.dataSource = new MatTableDataSource( [
      {
        id: 1,
        car_nombre: 'CONECTIVIDAD',
        car_descripcion: 'EQUIPOS Y ACCESORIOS NETWORKS',
      },
      {
        id: 2,
        car_nombre: 'CONECTIVIDAD2',
        car_descripcion: 'EQUIPOS Y ACCESORIOS NETWORKS',
      },
      {
        id: 3,
        car_nombre: 'CONECTIVIDAD3',
        car_descripcion: 'EQUIPOS Y ACCESORIOS NETWORKS',
      },
    
    ] );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
