import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidacionesService } from '../../../../core/services/validaciones.service';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { switchMap } from 'rxjs/operators';
import { Rol } from '../../../../core/interfaces/tipoRol.inteface';
import { RolService } from '../../../../core/services/rol.service';

@Component({
  selector: 'app-obj-usuarios',
  templateUrl: './obj-usuarios.component.html',
  styleUrls: ['./obj-usuarios.component.css']
})
export class ObjUsuariosComponent implements OnInit {

  titulo: string = 'AGREGAR';

  tipoUsuario: Rol[] = [ ];

  miFormulario: FormGroup = this.fb.group({
    id            : [0, [] ],
    identificacion: ['', [Validators.required, Validators.maxLength(11)] ],
    nombres       : ['', [Validators.required ] ],
    apellidos     : ['', [Validators.required ] ],
    telefono      : ['', [Validators.required, Validators.maxLength(13)] ],
    email         : ['', [Validators.required, Validators.pattern(this._valService.emailPattern)] ],
    password      : ['', [Validators.required ] ],
    direccion     : ['', [Validators.required, Validators.maxLength(100)] ],
    fotoUrl       : ['', [ ] ],
    rolId         : [1, [Validators.required ] ],
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
               private _usuarioService: UsuarioService,
               private _activatedRouted: ActivatedRoute,
               private _valService: ValidacionesService,
               private _rolService: RolService,
               private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {

    this._rolService.getRol().subscribe( roles => {
      this.tipoUsuario = roles;
    });

    if (this._router.url.includes('agregar')) {
      return
    }

    this.titulo = 'EDITAR';

    this._activatedRouted.params
              .pipe(
                switchMap( ({id}) => this._usuarioService.getUsuarioPorId( id ))
              )
              .subscribe( usuario => this.miFormulario.setValue(usuario));
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

    if (this._router.url.includes('agregar')) {
      this._usuarioService.agregarUsuario(this.miFormulario.value).subscribe(usuario => {
        if (usuario.ok) {
          this.mostrarSnackbar('Se agregó el usuario exitosamente');
          this._router.navigateByUrl('/usuarios');
        }
      }, err => {
        this.mostrarSnackbar(err.error.message);
      })
    } else if(this._router.url.includes('editar')){
      this._activatedRouted.params.pipe(
        switchMap( ({ id }) => this._usuarioService.editarUsuario( id, this.miFormulario.value ))
      ).subscribe( resp => {
        if (resp.ok) {
          this.mostrarSnackbar('Se editó el usuario exitosamente');
          this._router.navigateByUrl('/usuarios');
        }
      });
    }
    
  }

  volver(){
    this._router.navigate(['./usuarios']);
  }

  mostrarSnackbar( mensaje: string ): void {
    this._snackBar.open( mensaje, 'Ok!', {
      duration: 3000
    });
  }
}
