import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Permissions} from "../services/permissions.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private permissions: Permissions, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.permissions.canActivate()) {
      return true;
    } else {
      // this.router.navigate(['/sign-in']);
      return false;
    }
  }
}
