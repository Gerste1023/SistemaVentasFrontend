import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmarComponent } from 'src/app/features/components/confirmar/confirmar.component';
import { Usuario } from '../../../../core/interfaces/usuario.interface';
import { UsuarioService } from '../../../../core/services/usuario.service';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrls: ['./list-usuarios.component.css']
})
export class ListUsuariosComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'identificacion',
    'nombres',
    'apellidos',
    'telefono',
    'email',
    'direccion',
    'rol',
    'actions',
  ];

  dataSource!: MatTableDataSource<Usuario>;

  constructor( private _router: Router,
               private _dialog: MatDialog,
               private _snackBar: MatSnackBar,
               private _usuarioService: UsuarioService,

  ) { this.dataSource = new MatTableDataSource<Usuario>([]) }

  ngOnInit(): void {
    this.cargarUsuario();
  }
  
  cargarUsuario() {
    this._usuarioService.getUsuario().subscribe( usuarios => this.dataSource.data = usuarios );
      /*{ console.log(usuarios);
          console.log(usuarios[0].rol.tipoRol,'usuarios[0].rol.tipoRol');
        }*/
  }

  editarUsuario( index: number ): void {
    this._router.navigate(['/usuarios/editar',index]);
  }

  eliminarUsuario( index: number, data: string ): void {

    const dialog = this._dialog.open( ConfirmarComponent, {
      width: '250px',
      data
    } );

    dialog.afterClosed().subscribe( result => {
      if ( result ) {
        this._usuarioService.borarUsuario(index.toString()).subscribe( resp => {
          this.mostrarSnackbar('El usuario fue borrado con exito!');
          this.cargarUsuario();
        }, err => {
          this.mostrarSnackbar(err.error.message);
        });
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