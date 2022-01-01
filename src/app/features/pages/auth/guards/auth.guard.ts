import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService, private router: Router ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean > | boolean  {

      if ( this.authService.validarAutenticacion() ) {
        return true;
      }
      console.log('Bloqueado por el AuthGuards canActivate');
      this.router.navigateByUrl('/auth');

    return false;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      if ( this.authService.validarAutenticacion() ) {
        return true;
      }
      console.log('Bloqueado por el AuthGuards canLoad');
      this.router.navigateByUrl('/auth');
      
    return false;
  }
}
