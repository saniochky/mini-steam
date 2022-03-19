import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
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
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
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
}
