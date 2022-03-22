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
        await itemRef.update({ lastlogin: new Date() });
       
        localStorage.setItem('id', uid);
        localStorage.setItem('isLogged', 'true')
      } 
    } catch (error: any) {
      window.alert(error.message);
    }
  }
}
