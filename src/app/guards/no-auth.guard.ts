import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Permissions} from "../shared/services/permissions.service";

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(private permissions: Permissions, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.permissions.canActivate()) {
      return true;
    } else {
      // this.router.navigate(['user-profile']);
      return false;
    }
  }
}
