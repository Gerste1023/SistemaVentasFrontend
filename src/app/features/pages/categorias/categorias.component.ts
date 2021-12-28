import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'car_nombre',
    'car_descripcion',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;

  constructor() { }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource( [
      {
        id: 1,
        car_nombre: 'CONECTIVIDAD',
        car_descripcion: 'EQUIPOS Y ACCESORIOS NETWORKS',
      },
      
    ] );

  }

  editarInstrumento(index: number): void {
/*     // console.log(this._instrumentoService.editarInstrumento(index));
    this.editarUnInstrumento = this._instrumentoService.editarInstrumento(index);
    this.router.navigate(['/instrumentos/editar',index]);
    // this.iraAgregar(); */
  }
  eliminarInstrumento(index: number): void {
/*     this._instrumentoService.eliminarInstrumento(index);
    this.cargarInstrumentos(); */
  }

}
