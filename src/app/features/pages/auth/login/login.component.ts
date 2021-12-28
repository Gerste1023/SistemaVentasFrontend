import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Auth } from 'src/app/core/interfaces/auth.inteface';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  login: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
  ) {
    this.login = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  campoEsValido( campo: string ) {
    return this.login.get(campo)?.errors 
           && this.login.get(campo)?.touched;
  }

  log() {

/*    
      let usuario = this.login.get('usuario')?.value;
      let password = this.login.get('password')?.value;
      this._authService.login( usuario, password ).subscribe(
      resp => {
        console.log(resp);
        if ( resp.id ) {
          this._router.navigate(['/categorias']);
        }else {
          
        }
      }
    ); */

    // this._router.navigate(['/categorias']);
    
    this.loading = true;
    this.cargando();

    if ( this.login.invalid ) {
      this.login.markAllAsTouched();
      this.loading = false;
      return;
    }
    
    let usuario = this.login.get('usuario')?.value;
    let password = this.login.get('password')?.value;
    this._authService.login( usuario, password ).subscribe(
      auth => { 

        
        //no existe
        if ( !auth.us_identificacion ) {
          console.log(1);
          console.log(auth);
          this.mostrarSnackbar('Usuario y/o Contraseña Invalida');
        } else {
          console.log(2);
          console.log(auth);
        }
        localStorage.setItem('identificacion', auth.us_identificacion ) 

        this.loading = false;
        this.cargando();
        this.login.reset();
    });






    /* setTimeout(() => {
      if (
        this.login.controls.usuario.value === 'gerste' &&
        this.login.controls.password.value === 'admin123'
      ) {
        this.login.reset();
        this._router.navigate(['/clientes']);
      } else {
        this.mostrarSnackbar('Usuario o Contraseña Invalida');
        this.login.reset();
        this.loading = false;
        this.cargando();
      }
      
    }, 1000); */

  }

  cargando(): boolean {
    return this.loading;
  }

  mostrarSnackbar( mensaje: string ): void {
    this._snackBar.open( mensaje, 'Ok!', {
      duration: 3000
    });
  }

  /* log(): void {
    const usuario: Usuario = {
      nombreUsuario: this.login.value.usuario,
      password: this.login.value.password,
    };
    this.loading = true;
    this.loginService.login(usuario).subscribe(
      (data) => {
        this.loading = false;
        this.loginService.setLocalStorage(data.token);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.log(error);
        this.loading = false;
        this.toastr.error(error.error.message, 'Error');
        this.login.reset();
      }
    ); */

}
