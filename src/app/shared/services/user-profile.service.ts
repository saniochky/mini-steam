import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { SignInService } from './sign-in.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(
    public firebaseAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public signInService: SignInService
  ) {}
  async updateUsername(username: string) {
    const localMail = localStorage.getItem('email');
    const localPass = localStorage.getItem('password');
    console.log(localMail);
    if (username.length < 6 || username.length > 20){
      return window.alert('Username shoud have at least 6 chars and less then 20 chars');
    }
      if (localMail && localPass) {
        try {
          const res = await this.firebaseAuth.signInWithEmailAndPassword(
            localMail,
            localPass
          );
          if (res.user) {
            const uid = res.user.uid;
            const itemRef = this.db.object('users/' + uid);
            itemRef.update({ username: username });
            const token = await res.user.getIdToken();
            console.log('token', token);
            localStorage.setItem('id', token);
            localStorage.setItem('isLogged', 'true')
          } else {
            window.alert('Xuinia');
          }
        } catch (error: any) {
          window.alert(error.message);
        }
      }
  }
  async updateAge(age: string) {
    const localMail = localStorage.getItem('email');
    const localPass = localStorage.getItem('password');
    console.log(localMail);
    if(+age> 100 || +age<0){
      return window.alert('Enter correct age');
    }
    if (localMail && localPass) {
      try {
        const res = await this.firebaseAuth.signInWithEmailAndPassword(
          localMail,
          localPass
        );
        if (res.user) {
          const uid = res.user.uid;
          const itemRef = this.db.object('users/' + uid);
          itemRef.update({ age: age });
          const token = await res.user.getIdToken();
          console.log('token', token);
          localStorage.setItem('id', token);
          localStorage.setItem('isLogged', 'true')
        } else {
          window.alert('Xuinia');
        }
      } catch (error: any) {
        window.alert(error.message);
      }
    }
  }
  async checkUpdates(username: string, age: string) {
    if (username && age) {
      this.updateUsername(username);
      this.updateAge(age);
    } else if (age) {
      this.updateAge(age);
    } else if (username) {
      this.updateUsername(username);
    } else{
      console.log('nothing');
    }
  }
}
