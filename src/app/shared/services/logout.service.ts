import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  isLogged = false;

  constructor(
    public firebaseAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    private router: Router
  ) {
  }

  async logout() {
    localStorage.removeItem('id');
    localStorage.setItem('isLogged', 'false');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    await this.firebaseAuth.signOut();
    await this.router.navigate(['/sign-in']);
  }
}
