import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../interfaces/proveedor.interface';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private baseUrl: string = 'https://localhost:44333';
  private baseApi: string = 'api/Proveedor';

  constructor( private http: HttpClient ) { }

  getProveedor(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.baseUrl}/${this.baseApi}/ListarProveedores`);
  }

  getProveedorPorId( id: string ): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.baseUrl}/${this.baseApi}/${id}`);
  }

  agregarProveedor( parametros: Proveedor ): Observable<Proveedor> {
    return this.http.post<Proveedor>(`${this.baseUrl}/${this.baseApi}/Agregar`, parametros);
  }

  editarProveedor( id: string, parametros: Proveedor ): Observable<Proveedor> {
    return this.http.put<Proveedor>(`${this.baseUrl}/${this.baseApi}/${id}`, parametros);
  }

  borrarProveedor( id: string ): Observable<Proveedor> {
    return this.http.delete<Proveedor>(`${this.baseUrl}/${this.baseApi}/${id}`);
  }
}
