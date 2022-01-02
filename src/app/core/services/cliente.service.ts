import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl: string = 'https://localhost:44333';
  private baseApi: string = 'api/Cliente';

  constructor( private http: HttpClient ) { }
  
  getCliente(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/${this.baseApi}/ListarClientes`);
  }
  
  getClientePorId( id: string ): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/${this.baseApi}/${id}`);
  }

  agregarCliente( parametros: Cliente ): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseUrl}/${this.baseApi}/Agregar`, parametros);
  }

  editarCliente( id: string, parametros: Cliente ): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.baseUrl}/${this.baseApi}/${id}`, parametros);
  }

  borrarCliente( id: string ): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.baseUrl}/${this.baseApi}/${id}`);
  }
}
