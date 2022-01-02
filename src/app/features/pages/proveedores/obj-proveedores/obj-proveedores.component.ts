import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { ProveedorService } from '../../../../core/services/proveedor.service';
import { ValidacionesService } from '../../../../core/services/validaciones.service';

@Component({
  selector: 'app-obj-proveedores',
  templateUrl: './obj-proveedores.component.html',
  styleUrls: ['./obj-proveedores.component.css']
})
export class ObjProveedoresComponent implements OnInit {

  titulo: string = 'AGREGAR';
  miFormulario: FormGroup = this.fb.group({
      id        : [0, [] ],
      nit       : ['', [Validators.required], Validators.maxLength(11) ],
      nombre    : ['', [Validators.required], Validators.maxLength(30) ],
      telefono  : ['', [Validators.required], Validators.maxLength(13), Validators.minLength(10) ],
      direccion : ['', [Validators.required], Validators.maxLength(250) ],
      email     : ['', [Validators.required], Validators.pattern(this._valservice.emailPattern) ],
  });

  get emailErrorMsg(): string {
    
    const errors = this.miFormulario.get('email')?.errors;
    if ( errors?.required ) {
      return 'Email es obligatorio*';
    } else if ( errors?.pattern ) {
      return 'El valor ingresado no tiene formato de correo: ejemplo@test.com';
    } else if ( errors?.emailTomado ) {
      return 'El email ya fue tomado';
    }

    return '';
  }

  get telefonoErrorMsg(): string {
    
    const errors = this.miFormulario.get('telefono')?.errors;
    if ( errors?.required ) {
      return 'Este campo es obligatorio*';
    } else if ( errors?.maxlength ) {
      return 'Debe tener máximo 13 números';
    } else if ( errors?.minlength ) {
      return 'Debe tener mínimo 10 números';
    }

    return '';
  }
  
  constructor( private fb: FormBuilder,
               private _router: Router,
               private _snackBar: MatSnackBar,
               private _activatedRouted: ActivatedRoute,
               private _proveedorService: ProveedorService,
               private _valservice: ValidacionesService
    ) { }

  ngOnInit(): void {
    if ( this._router.url.includes('agregar') ) {
      return;
    }
    this.titulo = 'EDITAR';
    this._activatedRouted.params
          .pipe(
              switchMap( ({ id }) => this._proveedorService.getProveedorPorId( id ) )
          )
          .subscribe( proveedor => this.miFormulario.setValue(proveedor));          
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

    if ( this._router.url.includes('agregar') ) {
      this._proveedorService.agregarProveedor(this.miFormulario.value)
          .subscribe( proveedor => {
            if ( proveedor.ok ) {
              this.mostrarSnackbar('Se agregó el proveedor exitosamente');
              this._router.navigateByUrl('/proveedores');
            }
          }, err => {
            this.mostrarSnackbar(err.error.message);
        });
      
    } else if( this._router.url.includes('editar') ) {
      this._activatedRouted.params
          .pipe(
            switchMap( ({ id }) => this._proveedorService.editarProveedor( id, this.miFormulario.value ) )
          ).subscribe( resp => {
            if (resp.ok) {
              this.mostrarSnackbar('Se editó el proveedor exitosamente');
              this._router.navigateByUrl('/proveedores');
            }
          });
    }
  }

  volver(){
    this._router.navigate(['./proveedores']);
  }

  mostrarSnackbar( mensaje: string ): void {
    this._snackBar.open( mensaje, 'Ok!', {
      duration: 3000
    });
  }
}
