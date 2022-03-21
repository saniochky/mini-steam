import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from './user';
@Injectable({
  providedIn: 'root',
})
@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  isLogged = false;
  constructor(
    public firebaseAuth: AngularFireAuth,
    public db: AngularFireDatabase
  ) {}

  async signup(email: string, password: string) {
    try {
      const usersRef = this.db.list('users');
      const friends: User[] = [];
      const res = await this.firebaseAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (res.user) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        this.isLogged = true;
        const uid = res.user.uid;
        localStorage.setItem('user', JSON.stringify(res.user));
        const usersRef = this.db.list('users');
        usersRef.set(uid, {
          email: email,
          password: password,
          uid: res.user.uid,
        } as User);
      } else {
        window.alert('Xuinia');
      }
      console.log(res.user?.uid);
    } catch (error: any) {
      window.alert(error.message);
    }
  }
}
