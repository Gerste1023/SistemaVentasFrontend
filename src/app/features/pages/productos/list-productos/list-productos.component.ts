import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmarComponent } from 'src/app/features/components/confirmar/confirmar.component';

@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrls: ['./list-productos.component.css']
})
export class ListProductosComponent implements OnInit {


  /* Pendiente la categoria, es un select */

  displayedColumns: string[] = [
    'id',
    'pro_codigo',
    'pro_nombre',
    'pro_referencia',
    'pro_marca',
    'pro_categoria',
    'pro_stock',
    'pro_salida',
    'pro_precio',
    'pro_descripcion',
    'pro_descuento',
    'actions',
  ];

  dataSource!: MatTableDataSource<any>;

  constructor( private _router: Router,
               private _dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  editarProductos( index: number ): void {

    this._router.navigate(['/productos/editar',index]);

  }

  eliminarProductos( index: number ): void {

    const dialog = this._dialog.open( ConfirmarComponent, {
      width: '250px'
    } );

    dialog.afterClosed().subscribe( result => {
      if ( result ) {

      //borrar producto con el servicio y despues cargar el contenido
      }
    });
    
  }

  cargarProductos() {
    this.dataSource = new MatTableDataSource( [
      {
        id: 1,
        pro_codigo: '123456',
        pro_nombre: 'CELULAR',
        pro_referencia: 'NOTE 8',
        pro_marca: 'XIAOMI',
        pro_categoria: 'ANDROID',
        pro_stock: 8,
        pro_salida: '2',
        pro_precio: 850000,
        pro_descripcion: 'ESTE CELULAR ES BUENO',
        pro_descuento: 'N/A',
      },
      {
        id: 2,
        pro_codigo: '123456',
        pro_nombre: 'CELULAR',
        pro_referencia: 'NOTE 8',
        pro_marca: 'XIAOMI',
        pro_categoria: 'ANDROID',
        pro_stock: 8,
        pro_salida: '2',
        pro_precio: 850000,
        pro_descripcion: 'ESTE CELULAR ES BUENO',
        pro_descuento: 'N/A',
      },
      {
        id: 3,
        pro_codigo: '123456',
        pro_nombre: 'CELULAR',
        pro_referencia: 'NOTE 8',
        pro_marca: 'XIAOMI',
        pro_categoria: 'ANDROID',
        pro_stock: 8,
        pro_salida: '2',
        pro_precio: 850000,
        pro_descripcion: 'ESTE CELULAR ES BUENO',
        pro_descuento: 'N/A',
      },
      {
        id: 4,
        pro_codigo: '123456',
        pro_nombre: 'CELULAR',
        pro_referencia: 'NOTE 8',
        pro_marca: 'XIAOMI',
        pro_categoria: 'ANDROID',
        pro_stock: 8,
        pro_salida: '2',
        pro_precio: 850000,
        pro_descripcion: 'ESTE CELULAR ES BUENO',
        pro_descuento: 'N/A',
      },
    ] );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
