import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, tap } from 'rxjs/operators';
import { CategoriaService } from '../../../../core/services/categoria.service';
import { Categoria } from '../../../../core/interfaces/categoria.inteface';

@Component({
  selector: 'app-obj-categorias',
  templateUrl: './obj-categorias.component.html',
  styleUrls: ['./obj-categorias.component.css']
})
export class ObjCategoriasComponent implements OnInit {

  titulo: string = 'AGREGAR';
  categoria: Categoria = {
    nombre: '',
    descripcion: ''
  };

  miFormulario: FormGroup = this.fb.group({
    id: [0, [] ],
    nombre: ['', [ Validators.required ] ],
    descripcion: ['', [ Validators.required ] ]
  });

  constructor( private fb: FormBuilder,
               private _router: Router,
               private _categoriaService: CategoriaService,
               private _activatedRouted: ActivatedRoute,
               private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    if ( this._router.url.includes('agregar') ) {
      return;
    }

    this.titulo = 'EDITAR';

    this._activatedRouted.params
          .pipe(
              switchMap( ({ id }) => this._categoriaService.getCategoriaPorId( id ) )
          )
          .subscribe( categoria => this.miFormulario.setValue(categoria));          
  }

  campoNoValido( campo: string ){
    return this.miFormulario.get(campo)?.invalid  
          && this.miFormulario.get(campo)?.touched
  }

  guardar(){
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    this.categoria = this.miFormulario.value;

    if ( this._router.url.includes('agregar') ) {
      this._categoriaService.agregarCategoria(this.categoria)
          .subscribe( categoria => {
            if ( categoria.ok ) {
              this.mostrarSnackbar('Se agregó la categoria exitosamente');
              this._router.navigateByUrl('/categorias');
            }
          }, err => {
            this.mostrarSnackbar(err.error.message);
        });
      
    } else if( this._router.url.includes('editar') ) {
      this._activatedRouted.params
          .pipe(
            switchMap( ({ id }) => this._categoriaService.editarCategoria( id, this.categoria ) )
          ).subscribe( resp => {
            if (resp.ok) {
              this.mostrarSnackbar('Se editó la categoría exitosamente');
              this._router.navigateByUrl('/categorias');
            }
          });
    }
    
  }

  volver(){
    this._router.navigate(['./categorias']);
  }

  mostrarSnackbar( mensaje: string ): void {
    this._snackBar.open( mensaje, 'Ok!', {
      duration: 3000
    });
  }

}
