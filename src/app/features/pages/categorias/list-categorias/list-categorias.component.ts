import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmarComponent } from '../../../components/confirmar/confirmar.component';
import { CategoriaService } from '../../../../core/services/categoria.service';
import { Categoria } from 'src/app/core/interfaces/categoria.inteface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-categorias',
  templateUrl: './list-categorias.component.html',
  styleUrls: ['./list-categorias.component.css']
})
export class ListCategoriasComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'nombre',
    'descripcion',
    'actions',
  ];

  categorias: Categoria[] = [];

  dataSource!: MatTableDataSource<Categoria>;

  constructor( private _router: Router,
               private _dialog: MatDialog,
               private _categoriasService: CategoriaService,
               private _snackBar: MatSnackBar
    ) { this.dataSource = new MatTableDataSource<Categoria>([]); }
    
  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this._categoriasService.getCategoria().subscribe( categorias => { 
      this.dataSource.data = categorias
    });
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
        this._categoriasService.borrarCategoria(index.toString()).subscribe( resp => {
          this.mostrarSnackbar("La categoría fue eliminada con exito!");
          this.cargarCategorias();
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
