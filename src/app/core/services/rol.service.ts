import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../interfaces/tipoRol.inteface';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private baseUrl: string = 'https://localhost:44333';
  private baseApi: string = 'api/';

  constructor( private http: HttpClient ) { }

  getRol(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.baseUrl}/${this.baseApi}`);
  }
}
