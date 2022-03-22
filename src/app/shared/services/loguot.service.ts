import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class LoguotService {
  isLogged = false;
  constructor(
    public firebaseAuth: AngularFireAuth,
    public db: AngularFireDatabase
  ) {}

  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('id');
    localStorage['isLogged'] = 'false'
     localStorage.removeItem('email');
     localStorage.removeItem('password');
  }
}
