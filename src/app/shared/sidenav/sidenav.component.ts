import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/core/interfaces/menu-dashboard.interface';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  templateMenu: MenuItem[] = [
    {
      texto: 'Categorias',
      ruta: './categorias',
      icon: 'category',
    },
    {
      texto: 'Clientes',
      ruta: './clientes',
      icon: 'groups',
    },
    {
      texto: 'Productos',
      ruta: './productos',
      icon: 'cases',
    },
    {
      texto: 'Proveedores',
      ruta: './proveedores',
      icon: 'hail',
    },
    {
      texto: 'Usuarios',
      ruta: './usuarios',
      icon: 'badge',
    },
    {
      texto: 'Ventas',
      ruta: './ventas',
      icon: 'point_of_sale',
    },
  ];

  usuario: string = '';

  get auth(){
    return this._authService.auth;
  }

  constructor( private _router: Router,
               private _authService: AuthService ) { }
  
  ngOnInit(): void {
    this.usuario = this._authService.getTokenDecoded().sub;
  }

  logout() {
    localStorage.clear();
    this._authService.logout();
    //localStorage.removeItem('token');
    this._router.navigate(['./auth']);
  }

}
