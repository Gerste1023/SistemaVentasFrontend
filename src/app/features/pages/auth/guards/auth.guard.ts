import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean > | boolean  {

      if ( this.authService.auth.us_identificacion ) {
        return true;
      }
      console.log('Bloqueado por el AuthGuards canActivate');

    return false;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      if ( this.authService.auth.us_identificacion ) {
        return true;
      }
      console.log('Bloqueado por el AuthGuards canLoad');

    
      /*       
      console.log('canLoad', false);
      console.log(route);
      console.log(segments); */
      
    return false;
  }
}
