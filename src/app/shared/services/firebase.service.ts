import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from './user';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  isLogged = false;
  constructor(
    public firebaseAuth: AngularFireAuth,
    public db: AngularFireDatabase
  ) {}
  async signin(email: string, password: string) {
    try {
      const res = await this.firebaseAuth.signInWithEmailAndPassword(
        email,
        password
      );
      console.log(res.user);
      if (res.user) {
        this.isLogged = true;
        const uid = res.user.uid;
        const itemRef = this.db.object('users/' + uid);
        itemRef.update({ lastlogin: new Date() });
        const token = await res.user.getIdToken();
        console.log('token', token);
        localStorage.setItem('user', token);
      } else {
        window.alert('Xuinia');
      }
    } catch (error: any) {
      window.alert(error.message);
    }
  }
  async signup(email: string, password: string) {
    let i = 0;
    try {
      const usersRef = this.db.list('users');
      const friends: User[] = [];
      const res = await this.firebaseAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (res.user) {
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
  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }
}
