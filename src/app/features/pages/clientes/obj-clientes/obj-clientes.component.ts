import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidacionesService } from '../../../../core/services/validaciones.service';
import { ClienteService } from '../../../../core/services/cliente.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-obj-clientes',
  templateUrl: './obj-clientes.component.html',
  styleUrls: ['./obj-clientes.component.css']
})
export class ObjClientesComponent implements OnInit {

  titulo: string = 'AGREGAR';
  miFormulario: FormGroup = this.fb.group({
    id         : [0, [] ],
    rut        : ['', [ Validators.required, Validators.maxLength(11) ] ],
    nombre     : ['', [ Validators.required, Validators.maxLength(30) ] ],
    telefono   : ['', [ Validators.required, Validators.maxLength(13), Validators.minLength(10) ] ],
    email      : ['', [ Validators.required, Validators.pattern(this._valservice.emailPattern) ] ],
    ciudad     : ['', [ Validators.required, Validators.maxLength(50) ] ],
    observacion: ['', [ Validators.required, Validators.maxLength(250) ] ],
  });

  get emailErrorMsg(): string {
    
    const errors = this.miFormulario.get('email')?.errors;
    if ( errors?.required ) {
      return 'Email es obligatorio';
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
      return 'Debe tener mínimo 13 números';
    }

    return '';
  }


  constructor( private fb: FormBuilder,
               private _router: Router,
               private _snackBar: MatSnackBar,
               private _clienteService: ClienteService,
               private _activatedRouted: ActivatedRoute,
               private _valservice: ValidacionesService
    ) { }

  ngOnInit(): void {
    if ( this._router.url.includes('agregar') ) {
      return;
    }
    this.titulo = 'EDITAR';
    this._activatedRouted.params
          .pipe(
              switchMap( ({ id }) => this._clienteService.getClientePorId( id ) )
          )
          .subscribe( cliente => this.miFormulario.setValue(cliente));  
    
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
      this._clienteService.agregarCliente(this.miFormulario.value)
          .subscribe( cliente => {
            if ( cliente.ok ) {
              this.mostrarSnackbar('Se agregó el cliente exitosamente');
              this._router.navigateByUrl('/clientes');
            }
          }, err => {
            this.mostrarSnackbar(err.error.message);
        });
      
    } else if( this._router.url.includes('editar') ) {
      this._activatedRouted.params
          .pipe(
            switchMap( ({ id }) => this._clienteService.editarCliente( id, this.miFormulario.value ) )
          ).subscribe( resp => {
            if (resp.ok) {
              this.mostrarSnackbar('Se editó el cliente exitosamente');
              this._router.navigateByUrl('/clientes');
            }
          });
    }

  }

  volver(){
    this._router.navigate(['./clientes']);
  }

  mostrarSnackbar( mensaje: string ): void {
    this._snackBar.open( mensaje, 'Ok!', {
      duration: 3000
    });
  }

}
