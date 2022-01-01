import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria.inteface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private baseUrl: string = 'https://localhost:44333';
  private baseApi: string = 'api/Categoria';

  constructor( private http: HttpClient ) { }
  
  getCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}/${this.baseApi}/ListarCategorias`);
  }
  
  getCategoriaPorId( id: string ): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.baseUrl}/${this.baseApi}/${id}`);
  }

  agregarCategoria( parametros: Categoria ): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.baseUrl}/${this.baseApi}/Agregar`, parametros);
  }

  editarCategoria( id: string, parametros: Categoria ): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.baseUrl}/${this.baseApi}/${id}`, parametros);
  }

  borrarCategoria( id: string ): Observable<Categoria> {
    return this.http.delete<Categoria>(`${this.baseUrl}/${this.baseApi}/${id}`);
  }

}
