import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import {SignInService} from './sign-in.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(
    public firebaseAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public signInService: SignInService
  ) {
  }

  async updateUsername(username: string) {
    const localMail = localStorage.getItem('email');
    const localPass = localStorage.getItem('password');
    if (username.length < 6 || username.length > 20) {
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
          await itemRef.update({username: username});
          localStorage.setItem('id', uid);
          localStorage.setItem('isLogged', 'true')
        }
        window.alert('Your username was successfully updated');
      } catch (error: any) {
        window.alert(error.message);
      }
    }
  }

  async updateAge(age: string) {
    const localMail = localStorage.getItem('email');
    const localPass = localStorage.getItem('password');
    if (+age > 100 || +age < 0) {
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
          await itemRef.update({age: age});
          localStorage.setItem('id', uid);
          localStorage.setItem('isLogged', 'true')
        }
        window.alert('Your age was successfully updated');
      } catch (error: any) {
        window.alert(error.message);
      }
    }
  }

  async checkUpdates(username: string, age: string) {
    if (username && age) {
      await this.updateUsername(username);
      await this.updateAge(age);
    } else if (age) {
      await this.updateAge(age);
    } else if (username) {
      await this.updateUsername(username);
    }
  }
}
