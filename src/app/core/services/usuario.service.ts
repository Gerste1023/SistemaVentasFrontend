import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl: string = 'https://localhost:44333';
  private baseApi: string = 'api/Usuario';

  constructor( private http: HttpClient ) { }

  getUsuario(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/${this.baseApi}/ListarUsuarios`);
  }
  
  getUsuarioPorId( id: string ): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/${this.baseApi}/${id}`);
  }

  agregarUsuario( parametros: Usuario ): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}/${this.baseApi}/Agregar`, parametros);
  }

  editarUsuario( id: string, parametros: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrl}/${this.baseApi}/${id}`, parametros);
  }

  borarUsuario( id: string ): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.baseUrl}/${this.baseApi}/${id}`);
  }

}
