import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../interfaces/auth.inteface';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'http://localhost:3000';
  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! }
  }

  constructor( private http: HttpClient ) { }

  login( usuario: string, password: string ): Observable<Auth> {
    return this.http.get<Auth>(`${ this.baseUrl }/usuarios?q=${usuario}&p=${password}`)
              .pipe(
                tap( auth => { 
                  this._auth = auth; 
                  console.log(auth,'authService'); 
                  /* console.log(auth,'authService');  */
                } ),


                tap( auth => { localStorage.setItem('identificacion', auth.us_identificacion ) 
                console.log(auth.us_identificacion,'authService');
                
                } ),
              );
  }

  logout() {
    this._auth = undefined;
  }

}
