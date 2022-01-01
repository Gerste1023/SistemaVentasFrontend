import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

import { Auth } from '../interfaces/auth.inteface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'https://localhost:44333';
  private _auth: Auth | undefined;
  private _token: String | undefined;

  get auth(): Auth {
    return { ...this._auth! }
  }

  get token(): String {
    return { ...this._token! }
  } 

  constructor( private http: HttpClient ) { }

  login( usuario: string, password: string ): Observable<Auth> {

    const parametros = { identificacion: usuario, password };

    return this.http.post<Auth>(`${ this.baseUrl }/api/Login`, parametros )
              .pipe(
                tap( resp => {
                  if (resp.ok) {
                    this._auth = resp;
                    this._token = resp.token;
                  }
                }),
              );
    /* return this.http.get<Auth>(`${ this.baseUrl }/usuarios?q=${usuario}&p=${password}`)
              .pipe(
                tap( auth => { 
                  this._auth = auth; 
                  console.log(auth,'authService'); 
                  
                } ),

                tap( auth => { localStorage.setItem('identificacion', auth.us_identificacion ) 
                console.log(auth.us_identificacion,'authService');
                
                } ),
              ); */
  }

/*   validarToken(): Observable<boolean> {
    const url  = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '' );

    return this.http.get<AuthResponse>( url, { headers } )
             .pipe(
                map( resp => { 
                  localStorage.setItem('token', resp.token! );
                  this._usuario = {
                    name: resp.name!,
                    uid: resp.uid!,
                    email: resp.email!
                  }
                  return resp.ok;
                } ),
                catchError( err => of(false) )
             );
  } */

  validarAutenticacion(): boolean {

    if ( localStorage.getItem('token') != undefined ) {
      this._auth = { 
        identificacion: this.getTokenDecoded().identificacion, 
        nombres: this.getTokenDecoded().sub
      };
    }else{
      return false;
    }
    
    if ( this._token === localStorage.getItem('token') ) {
      return true;
    }
    localStorage.clear();
    return false;
  }

  logout() {
    this._auth = undefined;
  }

  setLocalStorage(data: string): void {
    localStorage.setItem('token', data);
  }

  getTokenDecoded(): any {
    const helper = new JwtHelperService();
    
    const stoken = localStorage.getItem('token') as string | undefined;
 
    const decodedToken = helper.decodeToken(stoken);

    return decodedToken;
  } 

}
