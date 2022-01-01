import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
      usuario: ['1143378955', Validators.required],
      password: ['admin123', Validators.required],
    });
  }

  ngOnInit(): void {}

  campoEsValido( campo: string ) {
    return this.login.get(campo)?.errors 
           && this.login.get(campo)?.touched;
  }

  log() {
   
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
        this._authService.setLocalStorage(auth.token!)
        this._router.navigate(['/categorias']);
        this.loading = false;
        this.cargando();
        this.login.reset();
    }, err => {
        this.mostrarSnackbar(err.error.message);
        this.loading = false;
        this.cargando();
        this.login.reset();
    });
  }

  cargando(): boolean {
    return this.loading;
  }

  mostrarSnackbar( mensaje: string ): void {
    this._snackBar.open( mensaje, 'Ok!', {
      duration: 3000
    });
  }

}
